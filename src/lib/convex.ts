import { createClient } from "convex/react";
import { ConvexClient } from "convex/browser";

export const convexUrl =
  process.env.NEXT_PUBLIC_CONVEX_URL || process.env.CONVEX_URL || "";

export const convex = convexUrl ? new ConvexClient(convexUrl) : undefined;

export const convexReactClient = createClient({
  convexUrl,
});