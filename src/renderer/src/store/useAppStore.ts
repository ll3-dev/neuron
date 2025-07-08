import { create } from 'zustand'

type SelectedTab = {
  absolutePath: string
  name: string
  isFile: boolean
  isDirectory: boolean
}

interface AppState {
  isHeaderVisible: boolean
  selectedTab: SelectedTab
}
interface AppAction {
  setHeaderVisibility: (isVisible: boolean) => void
  setSelectedTab: (absolutePath: string) => void
}

export const useAppStore = create<AppState & { actions: AppAction }>((set) => ({
  isHeaderVisible: true,
  selectedTab: { absolutePath: '', name: '', isFile: false, isDirectory: false },
  actions: {
    setHeaderVisibility: (isVisible) => set({ isHeaderVisible: isVisible }),
    setSelectedTab: async (absolutePath) => {
      const fileInfo = await window.api.folder.fileStat(absolutePath)
      set({
        selectedTab: {
          absolutePath: absolutePath,
          name: fileInfo.name,
          isFile: fileInfo.isFile,
          isDirectory: fileInfo.isDirectory
        }
      })
    }
  }
}))
