import type { Config } from 'drizzle-kit'

export default {
  schema: './src/lib/db/schema/*',
  out: './src/lib/db/migrations',
  driver: 'better-sqlite',
} satisfies Config
