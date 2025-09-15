"use client";

import { useState, useMemo } from "react";
import ChannelList from "@/components/chat/ChannelList";
import MessageList from "@/components/chat/MessageList";
import ChatComposer from "@/components/chat/ChatComposer";
import ThreadPanel from "@/components/chat/ThreadPanel";
import NewChannelModal from "@/components/chat/NewChannelModal";
import { useChannels } from "@/modules/chat/hooks/useChannels";
import type { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function ChatPage() {
  const authUser = useQuery(api.auth.getCurrentUser);
  const currentUserId = useMemo(() => (authUser?._id as Id<"users">) ?? null, [authUser]);

  const { channels } = useChannels(currentUserId);
  const [activeId, setActiveId] = useState<Id<"channels"> | null>(null);
  const [threadParent, setThreadParent] = useState<Id<"messages"> | null>(null);
  const [openNewChannel, setOpenNewChannel] = useState(false);

  return (
    <div className="p-6 space-y-4 h-[75vh]">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Chat</h1>
        <button className="px-3 py-2 bg-primary text-primary-foreground rounded" onClick={() => setOpenNewChannel(true)}>
          + New Channel
        </button>
      </div>
      <div className="flex border rounded-md h-full min-h-96">
        <ChannelList
          channels={(channels as any)?.map((c: any) => ({ id: c._id, name: c.name })) ?? []}
          activeId={activeId as any}
          onSelect={(id) => {
            setActiveId(id as any);
            setThreadParent(null);
          }}
        />
        <div className="flex-1 flex">
          <div className="flex-1 flex flex-col">
            <MessageList
              channelId={activeId}
              currentUserId={currentUserId}
              onOpenThread={(pid) => setThreadParent(pid)}
            />
            <ChatComposer channelId={activeId} currentUserId={currentUserId} />
          </div>
          {threadParent && (
            <ThreadPanel
              parentId={threadParent}
              channelId={activeId}
              currentUserId={currentUserId}
              onClose={() => setThreadParent(null)}
            />
          )}
        </div>
      </div>

      <NewChannelModal
        open={openNewChannel}
        onOpenChange={setOpenNewChannel}
        currentUserId={currentUserId}
      />
    </div>
  );
}