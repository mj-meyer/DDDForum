import { integer, text, sqliteTable } from 'drizzle-orm/sqlite-core'
import { generateRandomString, alphabet } from 'oslo/crypto'

export const users = sqliteTable('users', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  email: text('email').unique().notNull(),
  username: text('username').unique().notNull(),
  firstName: text('firstName'),
  lastName: text('lastName'),
  password: text('password'),
})
