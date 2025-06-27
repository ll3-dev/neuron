import { getFileName } from '@renderer/lib/file'
import { useAppStore } from '@renderer/store/useAppStore'
import useNoteStore from '@renderer/store/useNoteStore'
import { useEditor } from 'novel'
import { useEffect } from 'react'

const EditorTitle = () => {
  const selectedTab = useAppStore((state) => state.selectedTab)
  const titleElement = useNoteStore((state) => state.titleElement)
  const { setTitleElement } = useNoteStore((state) => state.actions)
  const { setSelectedTab } = useAppStore((state) => state.actions)
  const { editor } = useEditor()

  const autoResizeTextarea = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = 'auto'
    textarea.style.height = `${textarea.scrollHeight}px`
  }

  useEffect(() => {
    titleElement?.focus()
  }, [titleElement])

  return (
    <textarea
      ref={setTitleElement}
      className="bg-transparent px-0 py-2 outline-none placeholder:text-neutral-400 text-4xl font-bold w-full resize-none overflow-hidden"
      placeholder="새 노트"
      value={getFileName(selectedTab)}
      onChange={async (e) => {
        const newTitle = e.currentTarget.value
        if (newTitle.trim().length < 1) {
          e.currentTarget.value = getFileName(selectedTab)
          return
        }
        const result = await window.api.folder
          .changeFileName(selectedTab, newTitle + '.md')
          .catch((error) => {
            console.error('Error changing file name:', error)
          })
        if (result) {
          setSelectedTab(result)
        }

        autoResizeTextarea(e.currentTarget)
      }}
      onFocus={() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === 'ArrowDown') {
          e.preventDefault()
          editor?.commands.focus('start')
        }
      }}
    />
  )
}

export default EditorTitle
