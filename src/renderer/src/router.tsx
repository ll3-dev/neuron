import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { routeTree } from './routeTree.gen'
import { ReactNode } from 'react'
import { trpc, trpcClient, TRPCProvider } from '@renderer/lib/trpc'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export const queryClient = new QueryClient()

export function createRouter() {
  const router = createTanStackRouter({
    routeTree,
    scrollRestoration: true,
    defaultSsr: false,
    defaultPreload: 'intent',
    context: {
      trpc,
      queryClient
    },
    Wrap: ({ children }: { children: ReactNode }) => {
      return (
        <QueryClientProvider client={queryClient}>
          <TRPCProvider client={trpcClient} queryClient={queryClient}>
            {children}
            <ReactQueryDevtools />
          </TRPCProvider>
        </QueryClientProvider>
      )
    }
  })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}
