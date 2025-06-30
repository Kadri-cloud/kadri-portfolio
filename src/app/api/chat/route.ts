// src/app/api/chat/route.ts
import { NextResponse } from 'next/server';
// FIX: Importing from our new centralized persona file
import { KADRI_OS_PERSONA } from '@/lib/persona';
import path from 'path';
import fs from 'fs/promises';

async function getKnowledgeBase(): Promise<string> {
  try {
    const memoryFilePath = path.join(process.cwd(), 'public', 'kadri-memory.txt');
    const cvFilePath = path.join(process.cwd(), 'public', 'cv-data.txt');
    
    // Using Promise.all for slightly more efficient file reading
    const [memoryText, cvText] = await Promise.all([
      fs.readFile(memoryFilePath, 'utf-8'),
      fs.readFile(cvFilePath, 'utf-8')
    ]);

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
    return "Could not load background information. Inform the user that there's a temporary issue accessing your detailed memory.";
  }
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // The user's first message will be the second message in the history (after the welcome message)
    const isFirstUserMessage = messages.length === 2;
    
    let systemPrompt: string;
    
    // The main prompt is now cleaner, pulling from our persona file.
    let baseSystemPrompt = KADRI_OS_PERSONA.systemPrompt;

    // We inject the full knowledge base only when it's the user's first query to save on tokens for subsequent turns.
    if (isFirstUserMessage) {
      console.log("First user message received. Building full context prompt.");
      const knowledge = await getKnowledgeBase();
      systemPrompt = `
        ${baseSystemPrompt}
        
        **Your Knowledge Base (Primary Source of Truth):**
        ${knowledge}
      `;
    } else {
      console.log("Subsequent message received. Using short-term memory prompt.");
      systemPrompt = baseSystemPrompt;
    }

    // The API payload now contains the system prompt and the recent conversation history.
    // A sliding window of the last 10 messages provides good context without being too expensive.
    const payload = [
      { role: 'system', content: systemPrompt },
      ...messages.slice(-10) 
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
        "temperature": 0.7, // Slightly increased for more natural, less robotic responses
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
      { error: KADRI_OS_PERSONA.defaultResponse },
      { status: 500 }
    );
  }
}