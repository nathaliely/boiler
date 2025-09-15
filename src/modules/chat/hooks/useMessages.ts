"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export function useMessages(channelId: Id<"channels"> | null) {
  const messages = useQuery(
    api.messages.listByChannel,
    channelId ? { channelId } : "skip"
  );
  return { messages: messages ?? [] };
}