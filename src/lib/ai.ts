import { createOpenAI } from "@ai-sdk/openai";

export const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";

export const openai = createOpenAI({
  apiKey: OPENAI_API_KEY,
  fetch: typeof fetch !== "undefined" ? fetch : undefined,
});

export const defaultModel = "gpt-4o-mini";