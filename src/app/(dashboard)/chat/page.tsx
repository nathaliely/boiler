import SimpleChat from "@/components/chat/SimpleChat";

export default function ChatPage() {
  return (
    <div className="p-6 space-y-4 h-[70vh]">
      <h1 className="text-2xl font-semibold">Chat</h1>
      <SimpleChat />
    </div>
  );
}