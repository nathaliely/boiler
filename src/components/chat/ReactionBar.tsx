"use client";

import { useState } from "react";
import type { Id } from "@/convex/_generated/dataModel";
import { useReactToMessage, useUnreactToMessage } from "@/modules/chat/services/reactions";

const EMOJIS = ["👍", "🎯", "✅", "🚀", "❤️", "💬"];

export default function ReactionBar({
  messageId,
  currentUserId,
  reactions,
}: {
  messageId: Id<"messages">;
  currentUserId: Id<"users"> | null;
  reactions: Array<{ emoji: string; userId: Id<"users"> }> | undefined;
}) {
  const react = useReactToMessage();
  const unreact = useUnreactToMessage();
  const [busy, setBusy] = useState<string | null>(null);

  async function toggle(emoji: string) {
    if (!currentUserId) return;
    setBusy(emoji);
    const hasReacted = (reactions ?? []).some(
      (r) => r.emoji === emoji && (r.userId as any) === currentUserId
    );
    try {
      if (hasReacted) {
        await unreact({ messageId, emoji, userId: currentUserId });
      } else {
        await react({ messageId, emoji, userId: currentUserId });
      }
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="flex items-center gap-1 mt-1">
      {EMOJIS.map((e) => {
        const count = (reactions ?? []).filter((r) => r.emoji === e).length;
        const mine = currentUserId
          ? (reactions ?? []).some((r) => r.emoji === e && (r.userId as any) === currentUserId)
          : false;
        return (
          <button
            key={e}
            onClick={() => toggle(e)}
            disabled={!!busy}
            className={`text-xs px-2 py-1 border rounded ${
              mine ? "bg-primary/10 border-primary" : "hover:bg-muted"
            }`}
            title={mine ? "Remove reaction" : "Add reaction"}
          >
            {e} {count > 0 ? count : ""}
          </button>
        );
      })}
    </div>
  );
}