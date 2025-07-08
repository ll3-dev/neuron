import { DEFAULT_FOLDER_KEY } from '@renderer/constats/app'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  beforeLoad: async () => {
    const folder = await window.api.keyValueStore.getValue(DEFAULT_FOLDER_KEY)
    throw redirect({
      to: '/editor',
      replace: true,
      search: { absolutePath: folder || '' }
    })
  }
})
