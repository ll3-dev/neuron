import { DEFAULT_FOLDER_KEY, FOLDER_ITEMS_KEY } from '@renderer/constats/app'
import { useMutation, useSuspenseQuery } from '@tanstack/react-query'

export const useMainFolderQuery = () =>
  useSuspenseQuery({
    queryKey: [DEFAULT_FOLDER_KEY],
    queryFn: () => window.api.keyValueStore.getValue(DEFAULT_FOLDER_KEY)
  })

export const useDirectoryItemsMutate = () =>
  useMutation({
    mutationKey: [FOLDER_ITEMS_KEY],
    mutationFn: window.api.folder.folderItems
  })
