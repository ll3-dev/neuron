import { JSONContent } from 'novel'
import { create } from 'zustand'

interface NoteState {
  title: string
  content: JSONContent | null
  titleElement: HTMLTextAreaElement | null
}

interface NoteAction {
  setTitle: (title: string) => void
  setContent: (content: JSONContent) => void
  setTitleElement: (element: HTMLTextAreaElement | null) => void
  titleFocus: () => void
}

const useNoteStore = create<NoteState & { actions: NoteAction }>((set) => ({
  title: '',
  content: null,
  titleElement: null,
  actions: {
    setTitle: (title: string) => set((state) => ({ ...state, title })),
    setContent: (content: JSONContent) => set((state) => ({ ...state, content })),
    setTitleElement: (element: HTMLTextAreaElement | null) =>
      set((state) => ({ ...state, titleElement: element })),
    titleFocus: () =>
      set((state) => {
        if (state.titleElement) {
          state.titleElement.focus()
        }
        return state
      })
  }
}))

export default useNoteStore
