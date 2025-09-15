import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";

export function useReactToMessage() {
  const react = useMutation(api.messages.react);
  return (args: { messageId: Id<"messages">; emoji: string; userId: Id<"users"> }) =>
    react(args);
}

export function useUnreactToMessage() {
  const unreact = useMutation(api.messages.unreact);
  return (args: { messageId: Id<"messages">; emoji: string; userId: Id<"users"> }) =>
    unreact(args);
}