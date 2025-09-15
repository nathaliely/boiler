import { NextRequest } from "next/server";
import { streamText } from "ai";
import { openai, defaultModel } from "@/lib/ai";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const { text, target = "en" } = await req.json();

  const prompt = `Translate between English and Vietnamese. Keep meaning and technical terms.
Return plain translated text only.
Target language: ${target}
Text: ${text}`;

  const result = await streamText({
    model: openai(defaultModel),
    prompt,
  });

  return result.toAIStreamResponse();
}