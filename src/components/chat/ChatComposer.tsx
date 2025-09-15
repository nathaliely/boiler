"use client";

import { useState } from "react";
import { useSendMessage, usePatchTranslation } from "@/modules/chat/services/messageService";
import type { Id } from "@/convex/_generated/dataModel";

export default function ChatComposer({
  channelId,
  currentUserId,
}: {
  channelId: Id<"channels"> | null;
  currentUserId: Id<"users"> | null;
}) {
  const [text, setText] = useState("");
  const [transTarget, setTransTarget] = useState<"none" | "vi" | "en">("none");
  const [busy, setBusy] = useState(false);
  const sendMessage = useSendMessage();
  const patchTranslation = usePatchTranslation();

  async function onSend(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim() || !channelId || !currentUserId) return;
    setBusy(true);
    try {
      const messageId = await sendMessage({
        channelId,
        senderId: currentUserId,
        content: text,
      });
      if (transTarget !== "none") {
        const res = await fetch("/api/ai/translate", {
          method: "POST",
          body: JSON.stringify({ text, target: transTarget }),
        });
        const translated = await res.text();
        await patchTranslation({
          messageId,
          lang: transTarget,
          text: translated,
        });
      }
      setText("");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSend} className="flex items-center gap-2 p-2 border-t">
      <select
        className="border rounded px-2 py-2 text-sm"
        value={transTarget}
        onChange={(e) => setTransTarget(e.target.value as any)}
        title="Auto-translate sent message"
      >
        <option value="none">No translation</option>
        <option value="vi">Translate to Vietnamese</option>
        <option value="en">Translate to English</option>
      </select>
      <input
        className="flex-1 border rounded px-3 py-2"
        placeholder={channelId ? "Type a message..." : "Select a channel"}
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={!channelId || !currentUserId || busy}
      />
      <button
        className="px-3 py-2 bg-primary text-primary-foreground rounded disabled:opacity-50"
        disabled={!channelId || !currentUserId || busy}
      >
        {busy ? "Sending..." : "Send"}
      </button>
    </form>
  );
}