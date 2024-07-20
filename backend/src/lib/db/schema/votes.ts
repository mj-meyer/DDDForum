import { integer, text, sqliteTable } from 'drizzle-orm/sqlite-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { posts } from './posts'
import { members } from './members'

export const votes = sqliteTable('votes', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  postId: integer('postId')
    .references(() => posts.id)
    .notNull(),
  memberId: integer('memberId')
    .references(() => members.id)
    .notNull(),
  voteType: text('voteType').notNull(),
})

export const baseSchema = createSelectSchema(votes)
export const updateVoteSchemaParams = createInsertSchema(votes).partial()
export const insertVoteSchemaParams = createInsertSchema(votes).omit({
  id: true,
})
export const findVoteSchemaParams = baseSchema.pick({ postId: true })

export type Vote = typeof votes.$inferSelect
