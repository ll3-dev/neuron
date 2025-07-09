import { initTRPC } from '@trpc/server'
import EventEmitter, { on } from 'events'
import superjson from 'superjson'

const t = initTRPC.create({
  isServer: true,
  transformer: superjson
})

export const router = t.router
export const publicProcedure = t.procedure

export const subscriptionBuilder = <T>(event: EventEmitter, eventTitle: string) =>
  publicProcedure.subscription(async function* (opt) {
    for await (const [data] of on(event, eventTitle, { signal: opt.signal })) {
      const status = data as T
      yield status
    }
  })
