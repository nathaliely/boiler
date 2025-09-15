import { Id } from "convex/_generated/dataModel";

export type CreateRfqInput = {
  title: string;
  description: string;
  files?: string[];
  metadata?: Record<string, any>;
};

export async function createRfq(input: CreateRfqInput) {
  // Placeholder - wire to Convex mutation later
  return { id: "temp" as Id<"rfqs">, ...input };
}