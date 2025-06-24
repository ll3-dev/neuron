import { sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const keyValue = sqliteTable('key_value', {
  key: text('key').primaryKey(),
  value: text('value').notNull(),
  createdAt: text('created_at').notNull().default('CURRENT_TIMESTAMP'),
  updatedAt: text('updated_at').notNull().default('CURRENT_TIMESTAMP')
})
