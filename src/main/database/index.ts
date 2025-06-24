import { drizzle } from 'drizzle-orm/libsql/node'

export const appDb = drizzle('file:./neuron.db')
