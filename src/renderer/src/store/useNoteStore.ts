import { JSONContent } from 'novel'
import { create } from 'zustand'

interface NoteState {
  content: JSONContent | HTMLContent | JSONContent[] | null
  titleElement: HTMLTextAreaElement | null
}

type HTMLContent = string

interface NoteAction {
  setContent: (content: JSONContent | HTMLContent | JSONContent[]) => void
  setTitleElement: (element: HTMLTextAreaElement | null) => void
  titleFocus: () => void
}

const useNoteStore = create<NoteState & { actions: NoteAction }>((set) => ({
  content: null,
  titleElement: null,
  actions: {
    setContent: (content) => set((state) => ({ ...state, content })),
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
