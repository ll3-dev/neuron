import { AppRouter } from '@shared/type'
import { createTRPCReact } from '@trpc/react-query'
import { ipcLink } from 'electron-trpc-experimental/renderer'
import superjson from 'superjson'

export const trpc = createTRPCReact<AppRouter>()

export const trpcClient = trpc.createClient({
  links: [ipcLink({ transformer: superjson })]
})

export const TRPCProvider = trpc.Provider
