import { eq, sql } from 'drizzle-orm'
import { appDb } from '../../database'
import { keyValue } from '../schema'

const findValuePrepared = appDb
  .select({ value: keyValue.value })
  .from(keyValue)
  .where(eq(keyValue.key, sql.placeholder('key')))
  .prepare()

export const getValue = async (key: string) => {
  return findValuePrepared
    .get({ key })
    .then((result) => result?.value)
    .catch((error) => {
      console.error(`Error fetching value for key "${key}":`, error)
      return null
    })
}

export const setValue = async (key: string, value: string) => {
  const existing = await getValue(key)
  console.log(`Setting value for key "${key}":`, value)

  if (existing) {
    const { rowsAffected } = await appDb
      .update(keyValue)
      .set({ value, updatedAt: new Date().toISOString() })
      .where(eq(keyValue.key, key))
      .execute()
      .catch((error) => {
        console.error(`Error updating value for key "${key}":`, error)
        return { rowsAffected: 0 }
      })
    return rowsAffected === 1
  } else {
    const { rowsAffected } = await appDb
      .insert(keyValue)
      .values({ key, value })
      .execute()
      .catch((error) => {
        console.error(`Error inserting value for key "${key}":`, error)
        return { rowsAffected: 0 }
      })
    return rowsAffected === 1
  }
}

export const deleteValue = async (key: string) => {
  console.log(`Deleting value for key "${key}"`)
  const { rowsAffected } = await appDb
    .delete(keyValue)
    .where(eq(keyValue.key, key))
    .execute()
    .catch((error) => {
      console.error(`Error deleting value for key "${key}":`, error)
      return { rowsAffected: 0 }
    })
  return rowsAffected === 1
}
