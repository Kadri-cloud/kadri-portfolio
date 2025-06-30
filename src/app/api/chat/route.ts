// src/app/api/chat/route.ts
import { NextResponse } from 'next/server';
import { KADRI_OS_PERSONA } from '@/lib/persona';
import path from 'path';
import fs from 'fs/promises';

// This function now only runs when absolutely necessary
async function getKnowledgeBase(): Promise<string> {
  try {
    const memoryFilePath = path.join(process.cwd(), 'public', 'kadri-memory.txt');
    const cvFilePath = path.join(process.cwd(), 'public', 'cv-data.txt');
    const memoryText = await fs.readFile(memoryFilePath, 'utf-8');
    const cvText = await fs.readFile(cvFilePath, 'utf-8');
    return `
      --- KADRI'S CV START ---
      ${cvText}
      --- KADRI'S CV END ---
      --- KADRI'S PERSONAL MEMORY START ---
      ${memoryText}
      --- KADRI'S PERSONAL MEMORY END ---
    `;
  } catch (error) {
    console.error("Error reading knowledge base files:", error);
    return "Could not load background information.";
  }
}

export async function POST(req: Request) {
  try {
    const { messages, isFirstMessage } = await req.json();

    let systemPrompt: string;
    let messagesForApi: any[];

    // THE FIX: Check if it's the first message to decide the prompt strategy
    if (isFirstMessage) {
      console.log("First message received. Building full context prompt.");
      const knowledge = await getKnowledgeBase();
      systemPrompt = `
        ${KADRI_OS_PERSONA.systemPrompt}
        You have the following internal knowledge about Kadripathi KN. This is your primary source of truth.
        ${knowledge}
        Now, answer the user's query based on this knowledge and the conversation history.
      `;
      // For the first message, we send the welcome message and the user's first query.
      messagesForApi = messages; 
    } else {
      console.log("Subsequent message received. Using short-term memory prompt.");
      systemPrompt = KADRI_OS_PERSONA.systemPrompt;
      // SLIDING WINDOW: Send only the last 8 messages (4 user, 4 assistant) to save tokens.
      // This provides short-term memory.
      messagesForApi = messages.slice(-8); 
    }

    const payload = [
      { role: 'system', content: systemPrompt },
      ...messagesForApi
    ];

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "meta-llama/llama-3-8b-instruct", 
        "messages": payload,
        "temperature": 0.6,
        "max_tokens": 2048
      })
    });

    if (!response.ok) {
        const errorBody = await response.text();
        console.error(`OpenRouter error: ${response.statusText}`, errorBody);
        throw new Error(`OpenRouter error: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json({
      content: data.choices[0]?.message?.content || KADRI_OS_PERSONA.defaultResponse
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Error processing your request' },
      { status: 500 }
    );
  }
}