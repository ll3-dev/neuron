import { DEFAULT_FOLDER_KEY } from '@renderer/constats/app'
import { trpcClient } from '@renderer/lib/trpc'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  beforeLoad: async () => {
    const folder = await trpcClient.keyValue.getValue.mutate({ key: DEFAULT_FOLDER_KEY })
    if (!folder) {
      throw redirect({
        to: '/welcome',
        replace: true
      })
    } else {
      throw redirect({
        to: '/editor',
        replace: true,
        search: { absolutePath: folder }
      })
    }
  }
})
