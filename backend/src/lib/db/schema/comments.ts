import {
  integer,
  text,
  sqliteTable,
  AnySQLiteColumn,
} from 'drizzle-orm/sqlite-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { posts } from './posts'
import { members } from './members'
import { relations } from 'drizzle-orm'

export const comments = sqliteTable('comments', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  postId: integer('postId')
    .references(() => posts.id)
    .notNull(),
  memberId: integer('memberId')
    .references(() => members.id)
    .notNull(),
  text: text('text').notNull(),
  parentCommentId: integer('parentCommentId').references(
    (): AnySQLiteColumn => comments.id
  ),
})

export const commentsRelations = relations(comments, ({ one }) => ({
  posts: one(posts, {
    fields: [comments.postId],
    references: [posts.id],
  }),
  members: one(members, {
    fields: [comments.memberId],
    references: [members.id],
  }),
}))

export const baseCommentSchema = createSelectSchema(comments)
export const updateCommentSchemaParams = createInsertSchema(comments).partial()
export const insertCommentSchemaParams = createInsertSchema(comments).omit({
  id: true,
})
export const findCommentSchemaParams = baseCommentSchema.pick({ postId: true })

export type Comment = typeof comments.$inferSelect
