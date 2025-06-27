import { create } from 'zustand'

interface AppState {
  isHeaderVisible: boolean
  selectedTab: string
}

interface AppAction {
  setHeaderVisibility: (isVisible: boolean) => void
  setSelectedTab: (tab: string) => void
}

export const useAppStore = create<AppState & { actions: AppAction }>((set) => ({
  isHeaderVisible: true,
  selectedTab: '',
  actions: {
    setHeaderVisibility: (isVisible) => set({ isHeaderVisible: isVisible }),
    setSelectedTab: (tab) => set({ selectedTab: tab })
  }
}))
