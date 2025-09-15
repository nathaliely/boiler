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

export const listThread = query({
  args: { parentId: v.id("messages") },
  handler: async (ctx, { parentId }) => {
    return await ctx.db
      .query("messages")
      .withIndex("by_parent", (q) => q.eq("parentId", parentId))
      .collect();
  },
});

export const send = mutation({
  args: {
    channelId: v.id("channels"),
    senderId: v.id("users"),
    content: v.string(),
    attachments: v.optional(v.array(v.id("_storage"))),
    parentId: v.optional(v.id("messages")),
  },
  handler: async (ctx, args) => {
    const messageId = await ctx.db.insert("messages", {
      ...args,
      createdAt: Date.now(),
    });
    return messageId;
  },
});

export const react = mutation({
  args: {
    messageId: v.id("messages"),
    emoji: v.string(),
    userId: v.id("users"),
  },
  handler: async (ctx, { messageId, emoji, userId }) => {
    const msg = await ctx.db.get(messageId);
    const reactions = (msg?.reactions ?? []).filter(
      (r: any) => !(r.emoji === emoji && r.userId === userId)
    );
    reactions.push({ emoji, userId });
    await ctx.db.patch(messageId, { reactions });
    return messageId;
  },
});

export const unreact = mutation({
  args: {
    messageId: v.id("messages"),
    emoji: v.string(),
    userId: v.id("users"),
  },
  handler: async (ctx, { messageId, emoji, userId }) => {
    const msg = await ctx.db.get(messageId);
    const reactions = (msg?.reactions ?? []).filter(
      (r: any) => !(r.emoji === emoji && r.userId === userId)
    );
    await ctx.db.patch(messageId, { reactions });
    return messageId;
  },
});

export const patchTranslation = mutation({
  args: {
    messageId: v.id("messages"),
    lang: v.string(),
    text: v.string(),
  },
  handler: async (ctx, { messageId, lang, text }) => {
    await ctx.db.patch(messageId, {
      translatedContent: { lang, text },
    });
    return messageId;
  },
});