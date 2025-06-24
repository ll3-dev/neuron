import { sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const keyValueSchema = sqliteTable('keyValue', {
  key: text('key').primaryKey(),
  value: text('value').notNull(),
  createdAt: text('created_at').notNull().default(new Date().toISOString()),
  updatedAt: text('updated_at').notNull().default(new Date().toISOString())
})
