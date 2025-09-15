import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";

export type CreateChannelInput = {
  name: string;
  type: "direct" | "group";
  members: Id<"users">[];
  relatedRfqId?: Id<"rfqs">;
};

export function useCreateChannel() {
  const create = useMutation(api.channels.create);
  return (input: CreateChannelInput) => create(input as any);
}