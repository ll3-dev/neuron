import { DEFAULT_FOLDER_KEY, FOLDER_ITEMS_KEY } from '@renderer/constats/app'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'

export const useMainFolderQuery = () =>
  useSuspenseQuery({
    queryKey: [DEFAULT_FOLDER_KEY],
    queryFn: () => window.api.keyValueStore.getValue(DEFAULT_FOLDER_KEY)
  })

export const useFolderItemsQuery = (absoluteFolderPath: string, enabled = false) =>
  useQuery({
    queryKey: [FOLDER_ITEMS_KEY, absoluteFolderPath],
    queryFn: async () => {
      return window.api.folder.folderItems(absoluteFolderPath)
    },
    enabled
  })
