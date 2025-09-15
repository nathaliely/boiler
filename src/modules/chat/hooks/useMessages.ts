import { useState } from "react";

export function useMessages(channelId: string | null) {
  const [messages, setMessages] = useState<Array<{ id: string; author: string; content: string }>>([]);
  return { messages, setMessages };
}