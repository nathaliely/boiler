"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export function useChannels(userId: Id<"users"> | null) {
  const channels = useQuery(
    api.channels.listByUser,
    userId ? { userId } : "skip"
  );
  return { channels: channels ?? [] };
}