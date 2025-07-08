import { FOLDER_ITEMS_KEY } from '@renderer/constats/app'
import { getFileName } from '@renderer/lib/file'
import { fileNameChagneQueue } from '@renderer/lib/taskQueue'
import useNoteStore from '@renderer/store/useNoteStore'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useThrottle } from '@toss/react'
import { useEditor } from 'novel'
import { ChangeEvent, useEffect, useState } from 'react'

interface EditorTitleProps {
  absolutePath?: string
}

const EditorTitle = ({ absolutePath }: EditorTitleProps) => {
  const [title, setTitle] = useState('')
  const { setTitleElement } = useNoteStore((state) => state.actions)
  const { editor } = useEditor()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const autoResizeTextarea = (textarea: HTMLTextAreaElement) => {
    if (!textarea) return
    textarea.style.height = 'auto'
    textarea.style.height = `${textarea.scrollHeight}px`
  }

  const updateTitleToFile = useThrottle((newTitle: string) => {
    if (!absolutePath) return
    fileNameChagneQueue.addTask(newTitle, () =>
      window.api.folder
        .changeFileName(absolutePath, newTitle + '.md')
        .then((result) => {
          if (!result) {
            console.warn('파일 이름 변경 실패:', absolutePath, newTitle)
            return null
          }
          navigate({
            to: '/editor',
            replace: true,
            search: { absolutePath: result }
          })
          queryClient.invalidateQueries({
            queryKey: [FOLDER_ITEMS_KEY, absolutePath.split('/').slice(0, -1).join('/')]
          })
          return result
        })
        .catch((error) => {
          console.error('Error changing file name:', error)
        })
    )
  }, 500)

  const onTitleChange = async (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (!absolutePath) return

    const newTitle = e.currentTarget.value
    if (newTitle.trim().length === 0) {
      let tryCount = 0
      let fileName = ''
      while (true) {
        fileName = '/새 노트' + (tryCount > 0 ? `(${tryCount})` : '')
        const newFileAbsolutePath = absolutePath.split('/').slice(0, -1).join('/') + fileName
        const isExistNewNote = await window.api.folder.isExistFileOrFolder(
          newFileAbsolutePath + '.md'
        )
        if (!isExistNewNote) {
          break
        }
        tryCount++
      }
      updateTitleToFile(fileName)
      autoResizeTextarea(e.target)
      return
    }

    setTitle(newTitle)
    autoResizeTextarea(e.target)
    updateTitleToFile(newTitle)
  }

  useEffect(() => {
    if (!absolutePath) return
    const title = getFileName(absolutePath)
    setTitle(title)
  }, [absolutePath])

  return (
    <textarea
      ref={setTitleElement}
      className="bg-transparent px-0 py-2 outline-none placeholder:text-neutral-400 text-4xl font-bold w-full resize-none overflow-hidden"
      placeholder="새 노트"
      value={title}
      onChange={onTitleChange}
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
