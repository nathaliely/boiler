"use client";

type Channel = { id: string; name: string };

export default function ChannelList({
  channels,
  activeId,
  onSelect,
}: {
  channels: Channel[];
  activeId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="w-64 border-r h-full p-2 space-y-1">
      <div className="px-2 text-xs text-muted-foreground uppercase">Channels</div>
      {channels.map((c) => (
        <button
          key={c.id}
          className={`w-full text-left px-2 py-1 rounded hover:bg-muted ${
            activeId === c.id ? "bg-muted" : ""
          }`}
          onClick={() => onSelect(c.id)}
        >
          #{c.name}
        </button>
      ))}
    </div>
  );
}