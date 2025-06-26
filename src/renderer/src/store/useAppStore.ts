import { create } from 'zustand'

interface AppState {
  isHeaderVisible: boolean
}

type api = typeof window.api

interface AppAction extends api {
  setHeaderVisibility: (isVisible: boolean) => void
}

export const useAppStore = create<AppState & { actions: AppAction }>((set) => ({
  isHeaderVisible: true,
  actions: {
    setHeaderVisibility: (isVisible) => set({ isHeaderVisible: isVisible }),
    ...window.api
  }
}))
