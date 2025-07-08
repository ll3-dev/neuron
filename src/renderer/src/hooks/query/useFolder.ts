import { DEFAULT_FOLDER_KEY, FOLDER_ITEMS_KEY, FILE_CONTENT_KEY } from '@renderer/constats/app'
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

export const useFileContentQuery = (absoluteFilePath?: string) =>
  useSuspenseQuery({
    queryKey: [FILE_CONTENT_KEY, absoluteFilePath],
    queryFn: async () => {
      return absoluteFilePath ? window.api.folder.readFileContent(absoluteFilePath) : undefined
    }
  })
