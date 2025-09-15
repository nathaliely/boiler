import { mutation, query } from "convex/server";
import { v } from "convex/values";

export const listByUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    return await ctx.db
      .query("channels")
      .withIndex("by_members", (q) => q.eq("members", userId))
      .collect();
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    type: v.union(v.literal("direct"), v.literal("group")),
    members: v.array(v.id("users")),
    relatedRfqId: v.optional(v.id("rfqs")),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("channels", {
      ...args,
      createdAt: now,
      updatedAt: now,
    });
  },
});