export type CreateChannelInput = {
  name: string;
  type: "direct" | "group";
  members: string[];
  relatedRfqId?: string;
};

export async function createChannel(input: CreateChannelInput) {
  // TODO: wire to Convex mutation
  return { id: crypto.randomUUID(), createdAt: Date.now(), updatedAt: Date.now(), ...input };
}