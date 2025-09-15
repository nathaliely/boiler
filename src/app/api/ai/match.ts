import { NextRequest } from "next/server";
import { streamText } from "ai";
import { openai, defaultModel } from "@/lib/ai";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const { rfq, manufacturers } = await req.json();

  const prompt = `You are a sourcing assistant. Score and rank manufacturers by suitability for this RFQ.
Return JSON {matches: [{manufacturerId, score, reasons[]}]}.
RFQ: ${JSON.stringify(rfq)}
Manufacturers: ${JSON.stringify(manufacturers.slice(0, 50))}`;

  const result = await streamText({
    model: openai(defaultModel),
    prompt,
  });

  return result.toAIStreamResponse();
}