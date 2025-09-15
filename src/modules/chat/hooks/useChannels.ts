import { useState } from "react";

export function useChannels() {
  const [channels, setChannels] = useState<Array<{ id: string; name: string }>>([]);
  return { channels, setChannels };
}