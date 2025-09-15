"use client";

import { useState } from "react";

export default function RFQForm() {
  const [text, setText] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [extracted, setExtracted] = useState<string>("");

  async function onExtract() {
    setStreaming(true);
    setExtracted("");
    const res = await fetch("/api/ai/extract", {
      method: "POST",
      body: JSON.stringify({ text }),
    });
    if (!res.body) return;
    const reader = res.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      setExtracted((prev) => prev + decoder.decode(value));
    }
    setStreaming(false);
  }

  return (
    <div className="space-y-4">
      <textarea
        className="w-full border rounded p-3 min-h-40"
        placeholder="Paste RFQ text or requirements..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex gap-2">
        <button onClick={onExtract} className="px-3 py-2 bg-primary text-primary-foreground rounded">
          {streaming ? "Extracting..." : "Extract with AI"}
        </button>
      </div>
      {!!extracted && (
        <pre className="w-full whitespace-pre-wrap text-xs border rounded p-3 bg-muted">{extracted}</pre>
      )}
    </div>
  );
}