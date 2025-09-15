"use client";

import { useEffect, useRef } from "react";
import { useMessages } from "@/modules/chat/hooks/useMessages";
import type { Id } from "@/convex/_generated/dataModel";

export default function MessageList({ channelId }: { channelId: Id<"channels"> | null }) {
  const { messages } = useMessages(channelId);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages?.length]);

  if (!channelId) {
    return <div className="flex-1 flex items-center justify-center text-sm text-muted-foreground">Select a channel</div>;
  }

  return (
    <div className="flex-1 overflow-auto p-4 space-y-2">
      {(messages ?? []).map((m) => (
        <div key={(m as any)._id} className="text-sm">
          <div className="font-medium">{(m as any).senderId}</div>
          <div>{(m as any).content}</div>
          {(m as any).translatedContent?.text && (
            <div className="text-xs text-muted-foreground mt-1">
              {(m as any).translatedContent.lang}: {(m as any).translatedContent.text}
            </div>
          )}
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}