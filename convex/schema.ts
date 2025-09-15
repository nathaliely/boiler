// convex/schema.ts
import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  users: defineTable({
    avatarColor: v.optional(v.string()),
    avatarStorageId: v.optional(v.id('_storage')),
    // mark as optional so we can remove them safely
    email: v.string(),
    lastAuthMethod: v.optional(
      v.union(
        v.literal('email'),
        v.literal('google'),
        v.literal('github'),
        v.literal('discord')
      )
    ),
    name: v.optional(v.string()),
  })
    // keep indexes for now; we’ll drop them after data is clean
    .index('email', ['email']),

  // RFQs submitted by buyers
  rfqs: defineTable({
    createdBy: v.id('users'),
    title: v.string(),
    description: v.string(),
    files: v.optional(v.array(v.id('_storage'))),
    status: v.optional(v.union(
      v.literal('draft'),
      v.literal('submitted'),
      v.literal('matched'),
      v.literal('in_discussion'),
      v.literal('closed')
    )),
    metadata: v.optional(v.any()),
    extracted: v.optional(v.any()),
    matchedManufacturers: v.optional(v.array(v.id('manufacturers'))),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index('by_user', ['createdBy']).index('by_status', ['status']),

  // Manufacturers directory
  manufacturers: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    contactEmail: v.optional(v.string()),
    capabilities: v.optional(v.array(v.string())),
    locations: v.optional(v.array(v.string())),
    languages: v.optional(v.array(v.string())), // e.g. ['en', 'vi']
    rating: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index('by_name', ['name']),

  // Chat channels (buyer-manufacturer or group)
  channels: defineTable({
    name: v.string(),
    type: v.union(v.literal('direct'), v.literal('group')),
    members: v.array(v.id('users')),
    relatedRfqId: v.optional(v.id('rfqs')),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index('by_members', ['members']).index('by_rfq', ['relatedRfqId']),

  // Messages within channels
  messages: defineTable({
    channelId: v.id('channels'),
    senderId: v.id('users'),
    content: v.string(),
    translatedContent: v.optional(v.object({
      lang: v.string(),
      text: v.string(),
    })),
    attachments: v.optional(v.array(v.id('_storage'))),
    parentId: v.optional(v.id('messages')), // for threads
    reactions: v.optional(v.array(v.object({
      emoji: v.string(),
      userId: v.id('users'),
    }))),
    createdAt: v.number(),
  })
    .index('by_channel', ['channelId'])
    .index('by_parent', ['parentId']),
});
