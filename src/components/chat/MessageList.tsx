"use client";

import { useEffect, useRef } from "react";
import { useMessages } from "@/modules/chat/hooks/useMessages";
import type { Id } from "@/convex/_generated/dataModel";
import ReactionBar from "./ReactionBar";

export default function MessageList({
  channelId,
  currentUserId,
  onOpenThread,
}: {
  channelId: Id<"channels"> | null;
  currentUserId: Id<"users"> | null;
  onOpenThread: (parentId: Id<"messages">) => void;
}) {
  const { messages } = useMessages(channelId);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages?.length]);

  if (!channelId) {
    return (
      <div className="flex-1 flex items-center justify-center text-sm text-muted-foreground">
        Select a channel
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto p-4 space-y-4">
      {(messages ?? []).map((m: any) => (
        <div key={m._id} className="text-sm border-b pb-2">
          <div className="font-medium">{m.senderId}</div>
          <div className="whitespace-pre-wrap">{m.content}</div>
          {m.translatedContent?.text && (
            <div className="text-xs text-muted-foreground mt-1">
              {m.translatedContent.lang}: {m.translatedContent.text}
            </div>
          )}
          <ReactionBar
            messageId={m._id}
            currentUserId={currentUserId as any}
            reactions={m.reactions}
          />
          <div className="mt-1">
            <button
              className="text-xs text-primary hover:underline"
              onClick={() => onOpenThread(m._id)}
              title="Reply in thread"
            >
              Reply in thread
            </button>
          </div>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}