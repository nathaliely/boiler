import { query } from "convex/server";

export const listAll = query({
  args: {},
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();
    return users.map((u) => ({
      _id: u._id,
      email: u.email,
      name: u.name ?? null,
      avatarColor: u.avatarColor ?? null,
    }));
  },
});