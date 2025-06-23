import { create } from 'zustand'

interface AppState {
  isHeaderVisible: boolean
}

interface AppAction {
  setHeaderVisibility: (isVisible: boolean) => void
}

export const useAppStore = create<AppState & { actions: AppAction }>((set) => ({
  isHeaderVisible: true,
  actions: {
    setHeaderVisibility: (isVisible) => set({ isHeaderVisible: isVisible })
  }
}))
