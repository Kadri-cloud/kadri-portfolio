// src/app/api/chat/route.ts
import { NextResponse } from 'next/server';
import { KADRI_OS_PERSONA } from '@/lib/persona';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "",
        "X-Title": process.env.NEXT_PUBLIC_SITE_NAME || "",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "mistralai/mistral-7b-instruct:free",
        "messages": messages,
        "temperature": 0.7,
        "max_tokens": 1000
      })
    });

    if (!response.ok) {
      throw new Error(`OpenRouter error: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json({
      content: data.choices[0]?.message?.content || KADRI_OS_PERSONA.defaultResponse
    });

  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json(
      { error: 'Error processing your request' },
      { status: 500 }
    );
  }
}