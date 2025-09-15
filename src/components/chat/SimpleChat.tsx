"use client";

import { useState } from "react";

type Message = { id: string; author: string; content: string };

export default function SimpleChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");

  return (
    <div className="flex flex-col h-full border rounded-md">
      <div className="flex-1 overflow-auto p-4 space-y-2">
        {messages.map((m) => (
          <div key={m.id} className="text-sm">
            <span className="font-medium">{m.author}: </span>
            <span>{m.content}</span>
          </div>
        ))}
      </div>
      <form
        className="flex gap-2 p-2 border-t"
        onSubmit={(e) => {
          e.preventDefault();
          if (!text.trim()) return;
          setMessages((prev) => [...prev, { id: crypto.randomUUID(), author: "You", content: text }]);
          setText("");
        }}
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border rounded px-3 py-2"
        />
        <button className="px-3 py-2 bg-primary text-primary-foreground rounded">Send</button>
      </form>
    </div>
  );
}