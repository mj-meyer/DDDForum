import { relations } from 'drizzle-orm'
import { integer, sqliteTable } from 'drizzle-orm/sqlite-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { users } from './users'

export const members = sqliteTable('members', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  userId: integer('userId')
    .unique()
    .references(() => users.id)
    .notNull(),
})

export const membersRelations = relations(members, ({ one }) => ({
  user: one(users, {
    fields: [members.id],
    references: [users.id],
  }),
}))

export const baseMembersSchema = createSelectSchema(members)
export const updateMemberSchemaParams = createInsertSchema(members).partial()
export const insertMemberSchemaParams = createInsertSchema(members).omit({
  id: true,
})
export const findMemberSchemaParams = baseMembersSchema.pick({ userId: true })

export type Member = typeof members.$inferSelect
