import { useState } from "react";

export function useChat() {
  const [activeChannelId, setActiveChannelId] = useState<string | null>(null);
  return { activeChannelId, setActiveChannelId };
}