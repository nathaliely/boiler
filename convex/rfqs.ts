import { mutation, query } from "convex/server";
import { v } from "convex/values";

export const list = query({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }) => {
    return await ctx.db
      .query("rfqs")
      .withIndex("by_user", (q) => q.eq("createdBy", userId))
      .collect();
  },
});

export const create = mutation({
  args: {
    createdBy: v.id("users"),
    title: v.string(),
    description: v.string(),
    files: v.optional(v.array(v.id("_storage"))),
    metadata: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("rfqs", {
      ...args,
      status: "submitted",
      createdAt: now,
      updatedAt: now,
    });
  },
});