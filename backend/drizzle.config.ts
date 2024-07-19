// import type { Config } from 'drizzle-kit'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './src/lib/db/schema/*.ts',
  out: './src/lib/db/migrations',
  dialect: 'sqlite',
  dbCredentials: {
    url: './sqlite.db',
  },
})
