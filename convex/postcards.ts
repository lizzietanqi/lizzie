import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const MAX_NAME_LENGTH = 40;
const MAX_LOCATION_LENGTH = 60;
const MAX_MESSAGE_LENGTH = 500;
const MAX_DRAWING_DATA_URL_LENGTH = 180_000;
const POSTCARD_LIMIT = 64;

const trimToLength = (value: string, maxLength: number) =>
  value.trim().replace(/\s+/g, " ").slice(0, maxLength);

const trimMessage = (value: string) =>
  value.trim().replace(/\r\n/g, "\n").slice(0, MAX_MESSAGE_LENGTH);

const normalizeDrawing = (value: string | null) => {
  if (!value) return null;
  if (!value.startsWith("data:image/png;base64,")) return null;
  if (value.length > MAX_DRAWING_DATA_URL_LENGTH) return null;
  return value;
};

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("postcards")
      .withIndex("by_createdAt")
      .order("desc")
      .take(POSTCARD_LIMIT);
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    location: v.string(),
    message: v.string(),
    drawingDataUrl: v.union(v.string(), v.null()),
  },
  handler: async (ctx, args) => {
    const message = trimMessage(args.message);
    if (message.length === 0) {
      throw new Error("Postcard needs a message.");
    }

    return await ctx.db.insert("postcards", {
      name: trimToLength(args.name, MAX_NAME_LENGTH),
      location: trimToLength(args.location, MAX_LOCATION_LENGTH),
      message,
      drawingDataUrl: normalizeDrawing(args.drawingDataUrl),
      createdAt: Date.now(),
    });
  },
});
