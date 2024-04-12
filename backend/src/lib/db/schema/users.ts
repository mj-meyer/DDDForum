import { integer, text, sqliteTable } from 'drizzle-orm/sqlite-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'

export const users = sqliteTable('users', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  email: text('email').unique().notNull(),
  username: text('username').unique().notNull(),
  firstName: text('firstName'),
  lastName: text('lastName'),
  password: text('password'),
})

export const baseSchema = createSelectSchema(users)
export const updateUserSchemaParams = createInsertSchema(users).omit({
  password: true,
})
export const insertUserSchemaParams = createInsertSchema(users).omit({
  id: true,
})

export type User = typeof users.$inferSelect
