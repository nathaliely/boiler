import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";

export type SendMessageInput = {
  channelId: Id<"channels">;
  senderId: Id<"users">;
  content: string;
  attachments?: Id<"_storage">[];
};

export function useSendMessage() {
  const send = useMutation(api.messages.send);
  return async (input: SendMessageInput) => {
    const id = await send(input);
    return id;
  };
}

export function usePatchTranslation() {
  const patch = useMutation(api.messages.patchTranslation);
  return async (args: { messageId: Id<"messages">; lang: string; text: string }) => {
    await patch(args);
  };
}