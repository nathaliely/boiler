export type SendMessageInput = {
  channelId: string;
  content: string;
  attachments?: string[];
};

export async function sendMessage(input: SendMessageInput) {
  // TODO: wire to Convex mutation
  return { id: crypto.randomUUID(), createdAt: Date.now(), ...input, senderId: "me" };
}