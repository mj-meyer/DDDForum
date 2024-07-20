import { relations } from 'drizzle-orm'
import { integer, text, sqliteTable } from 'drizzle-orm/sqlite-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { comments } from './comments'
import { members } from './members'
import { votes } from './votes'

export const posts = sqliteTable('posts', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  memberId: integer('memberId')
    .references(() => members.id)
    .notNull(),
  postType: text('postType', { enum: ['link', 'text'] }).notNull(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  dateCreated: integer('dateCreated', { mode: 'timestamp_ms' })
    .notNull()
    .$defaultFn(() => new Date()),
})

export const postsRelations = relations(posts, ({ one, many }) => ({
  memberPostedBy: one(members, {
    fields: [posts.memberId],
    references: [members.id],
  }),
  votes: many(votes),
  comments: many(comments),
}))

export const basePostsSchema = createSelectSchema(posts)
export const updatePostSchemaParams = createInsertSchema(posts).partial()
export const insertPostSchemaParams = createInsertSchema(posts).omit({
  id: true,
})
export const findPostSchemaParams = basePostsSchema.pick({ memberId: true })

export type Post = typeof posts.$inferSelect
