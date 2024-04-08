import { sql } from 'drizzle-orm'
import { integer, text, sqliteTable } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').unique(),
  username: text('username').unique(),
  firstName: text('firstName'),
  lastName: text('lastName'),
  password: text('password'),
})
