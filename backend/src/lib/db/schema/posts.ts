import { integer, text, sqliteTable } from 'drizzle-orm/sqlite-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { members } from './members'

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

export const baseSchema = createSelectSchema(posts)
export const updatePostSchemaParams = createInsertSchema(posts).partial()
export const insertPostSchemaParams = createInsertSchema(posts).omit({
  id: true,
})
export const findPostSchemaParams = baseSchema.pick({ memberId: true })

export type Post = typeof posts.$inferSelect
