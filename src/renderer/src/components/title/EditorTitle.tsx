import useNoteStore from '@renderer/store/useNoteStore'
import { useEditor } from 'novel'
import { useEffect } from 'react'

const EditorTitle = () => {
  const title = useNoteStore((state) => state.title)
  const titleElement = useNoteStore((state) => state.titleElement)
  const { setTitle, setTitleElement } = useNoteStore((state) => state.actions)
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
      value={title}
      onChange={(e) => {
        setTitle(e.target.value)
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
