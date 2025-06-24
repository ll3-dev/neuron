import { drizzle } from 'drizzle-orm/libsql/node'
import * as configChema from './KeyValue/schema'

export const appDb = drizzle('file:./neuron.db', {
  schema: {
    keyValue: configChema.keyValueSchema
  }
})
