"use client";

import { useState, useMemo } from "react";
import ChannelList from "@/components/chat/ChannelList";
import MessageList from "@/components/chat/MessageList";
import ChatComposer from "@/components/chat/ChatComposer";
import { useChannels } from "@/modules/chat/hooks/useChannels";
import type { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function ChatPage() {
  const authUser = useQuery(api.auth.getCurrentUser);
  const currentUserId = useMemo(() => (authUser?._id as Id<"users">) ?? null, [authUser]);

  const { channels } = useChannels(currentUserId);
  const [activeId, setActiveId] = useState<Id<"channels"> | null>(null);

  return (
    <div className="p-6 space-y-4 h-[75vh]">
      <h1 className="text-2xl font-semibold">Chat</h1>
      <div className="flex border rounded-md h-full min-h-96">
        <ChannelList
          channels={(channels as any)?.map((c: any) => ({ id: c._id, name: c.name })) ?? []}
          activeId={activeId as any}
          onSelect={(id) => setActiveId(id as any)}
        />
        <div className="flex-1 flex flex-col">
          <MessageList channelId={activeId} />
          <ChatComposer channelId={activeId} currentUserId={currentUserId} />
        </div>
      </div>
    </div>
  );
}