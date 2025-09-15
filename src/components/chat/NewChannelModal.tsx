"use client";

import { useMemo, useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useCreateChannel } from "@/modules/chat/services/channelService";
import type { Id } from "@/convex/_generated/dataModel";

export default function NewChannelModal({
  open,
  onOpenChange,
  currentUserId,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  currentUserId: Id<"users"> | null;
}) {
  const allUsers = useQuery(api.users.listAll);
  const createChannel = useCreateChannel();

  const [name, setName] = useState("");
  const [type, setType] = useState<"direct" | "group">("group");
  const [selected, setSelected] = useState<Id<"users">[]>([]);
  const [busy, setBusy] = useState(false);

  const users = useMemo(
    () => (allUsers ?? []).filter((u: any) => u._id !== currentUserId),
    [allUsers, currentUserId]
  );

  async function onCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!currentUserId) return;
    if (type === "group" && !name.trim()) return;

    const members = Array.from(new Set([currentUserId, ...selected]));
    setBusy(true);
    try {
      await createChannel({
        name: type === "direct" ? "direct" : name,
        type,
        members,
      } as any);
      setName("");
      setSelected([]);
      onOpenChange(false);
    } finally {
      setBusy(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
      <div className="bg-background border rounded-md shadow-xl w-full max-w-lg">
        <div className="p-4 border-b">
          <div className="text-lg font-semibold">Create Channel</div>
        </div>
        <form onSubmit={onCreate} className="p-4 space-y-3">
          <div className="flex items-center gap-3">
            <label className="text-sm">Type</label>
            <select
              className="border rounded px-2 py-1 text-sm"
              value={type}
              onChange={(e) => setType(e.target.value as any)}
            >
              <option value="group">Group</option>
              <option value="direct">Direct</option>
            </select>
          </div>
          {type === "group" && (
            <div>
              <label className="text-sm block mb-1">Name</label>
              <input
                className="w-full border rounded px-3 py-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. rfq-123-discussion"
              />
            </div>
          )}
          <div>
            <label className="text-sm block mb-1">Members</label>
            <div className="max-h-48 overflow-auto border rounded p-2 space-y-1">
              {(users as any).map((u: any) => {
                const checked = selected.includes(u._id);
                return (
                  <label key={u._id} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(e) => {
                        setSelected((prev) =>
                          e.target.checked ? [...prev, u._id] : prev.filter((id) => id !== u._id)
                        );
                      }}
                    />
                    <span>{u.name || u.email}</span>
                  </label>
                );
              })}
            </div>
          </div>
          <div className="flex items-center justify-end gap-2 pt-2 border-t">
            <button
              type="button"
              className="px-3 py-2 rounded border"
              onClick={() => onOpenChange(false)}
              disabled={busy}
            >
              Cancel
            </button>
            <button
              className="px-3 py-2 rounded bg-primary text-primary-foreground disabled:opacity-50"
              disabled={busy || (type === "group" && !name.trim()) || selected.length === 0}
            >
              {busy ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}