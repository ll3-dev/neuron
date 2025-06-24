import { eq, sql } from 'drizzle-orm'
import { appDb } from '../../database'
import { keyValueSchema } from './schema'

const findValuePrepared = appDb
  .select({ value: keyValueSchema.value })
  .from(keyValueSchema)
  .where(eq(keyValueSchema.key, sql.placeholder('key')))
  .prepare()

export const getValue = (key: string) => findValuePrepared.get({ key })

export const setValue = async (key: string, value: string) => {
  const existing = await getValue(key)

  if (existing) {
    const { rowsAffected } = await appDb
      .update(keyValueSchema)
      .set({ value, updatedAt: new Date().toISOString() })
      .where(eq(keyValueSchema.key, key))
      .execute()
    return rowsAffected === 1
  } else {
    const { rowsAffected } = await appDb.insert(keyValueSchema).values({ key, value }).execute()
    return rowsAffected === 1
  }
}
