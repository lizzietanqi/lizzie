import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  postcards: defineTable({
    name: v.string(),
    location: v.string(),
    message: v.string(),
    drawingDataUrl: v.union(v.string(), v.null()),
    createdAt: v.number(),
  }).index("by_createdAt", ["createdAt"]),
});
