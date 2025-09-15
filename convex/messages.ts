import { mutation, query } from "convex/server";
import { v } from "convex/values";

export const listByChannel = query({
  args: { channelId: v.id("channels") },
  handler: async (ctx, { channelId }) => {
    return await ctx.db
      .query("messages")
      .withIndex("by_channel", (q) => q.eq("channelId", channelId))
      .collect();
  },
});

export const send = mutation({
  args: {
    channelId: v.id("channels"),
    senderId: v.id("users"),
    content: v.string(),
    attachments: v.optional(v.array(v.id("_storage"))),
  },
  handler: async (ctx, args) => {
    const messageId = await ctx.db.insert("messages", {
      ...args,
      createdAt: Date.now(),
    });
    return messageId;
  },
});