import { mutation, query } from "convex/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("manufacturers").collect();
  },
});

export const upsert = mutation({
  args: {
    id: v.optional(v.id("manufacturers")),
    name: v.string(),
    description: v.optional(v.string()),
    contactEmail: v.optional(v.string()),
    capabilities: v.optional(v.array(v.string())),
    locations: v.optional(v.array(v.string())),
    languages: v.optional(v.array(v.string())),
    rating: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    if (args.id) {
      await ctx.db.patch(args.id, { ...args, updatedAt: now });
      return args.id;
    }
    return await ctx.db.insert("manufacturers", { ...args, createdAt: now, updatedAt: now, name: args.name });
  },
});