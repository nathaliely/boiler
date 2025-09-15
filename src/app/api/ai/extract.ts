import { NextRequest } from "next/server";
import { streamText } from "ai";
import { openai, defaultModel } from "@/lib/ai";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const { text } = await req.json();

  const prompt = `You are an assistant that extracts structured RFQ fields from free text.
Return JSON with fields: title, description, quantity(optional), materials(optional), dueDate(optional), specs(optional: array of key/value). Input:
${text}`;

  const result = await streamText({
    model: openai(defaultModel),
    prompt,
  });

  return result.toAIStreamResponse();
} = await req.json();

  const prompt = `You are an assistant that extracts structured RFQ fields from free text.
Return JSON with fields: title, description, quantity(optional), materials(optional), dueDate(optional), specs(optional: array of key/value).