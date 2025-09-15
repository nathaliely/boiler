"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { useSendMessage } from "@/modules/chat/services/messageService";

export default function ThreadPanel({
  parentId,
  channelId,
  currentUserId,
  onClose,
}: {
  parentId: Id<"messages"> | null;
  channelId: Id<"channels"> | null;
  currentUserId: Id<"users"> | null;
  onClose: () => void;
}) {
  const [text, setText] = useState("");
  const thread = useQuery(api.messages.listThread, parentId ? { parentId } : "skip");
  const sendMessage = useSendMessage();
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [thread?.length]);

  const canSend = useMemo(() => !!parentId && !!channelId && !!currentUserId && !!text.trim(), [parentId, channelId, currentUserId, text]);

  async function onSend(e: React.FormEvent) {
    e.preventDefault();
    if (!canSend) return;
    await sendMessage({
      channelId: channelId as any,
      senderId: currentUserId as any,
      content: text,
      parentId: parentId as any,
    } as any);
    setText("");
  }

  if (!parentId) return null;

  return (
    <aside className="w-96 border-l h-full flex flex-col">
      <div className="p-2 border-b flex items-center justify-between">
        <div className="font-medium text-sm">Thread</div>
        <button className="text-sm text-muted-foreground hover:underline" onClick={onClose}>Close</button>
      </div>
      <div className="flex-1 overflow-auto p-3 space-y-3">
        {(thread ?? []).map((m: any) => (
          <div key={m._id} className="text-sm">
            <div className="font-medium">{m.senderId}</div>
            <div className="whitespace-pre-wrap">{m.content}</div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={onSend} className="p-2 border-t flex gap-2">
        <input
          className="flex-1 border rounded px-2 py-2"
          value={text}
          placeholder="Reply in thread"
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className="px-3 py-2 bg-primary text-primary-foreground rounded disabled:opacity-50"
          disabled={!canSend}
        >
          Send
        </button>
      </form>
    </aside>
  );
}