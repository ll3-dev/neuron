import { DEFAULT_FOLDER_KEY } from '@renderer/constats/app'
import { filePathJoin, getFileName } from '@renderer/lib/file'
import { fileChangeQueue } from '@renderer/lib/taskQueue'
import { trpc, trpcClient } from '@renderer/lib/trpc'
import useNoteStore from '@renderer/store/useNoteStore'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { useThrottle } from '@toss/react'
import { useEditor } from 'novel'
import { ChangeEvent, useEffect, useState } from 'react'

const EditorTitle = () => {
  const { absolutePath } = useSearch({ from: '/editor' })
  const [title, setTitle] = useState('')
  const { setTitleElement } = useNoteStore((state) => state.actions)
  const { editor } = useEditor()
  const navigate = useNavigate()
  const util = trpc.useUtils()

  const autoResizeTextarea = (textarea: HTMLTextAreaElement) => {
    if (!textarea) return
    textarea.style.height = 'auto'
    textarea.style.height = `${textarea.scrollHeight}px`
  }

  const updateTitleToFile = useThrottle(async (newTitle: string) => {
    if (!absolutePath) return
    const defaultFolder = await trpcClient.keyValue.getValue.mutate({ key: DEFAULT_FOLDER_KEY })
    if (!defaultFolder) return
    if (filePathJoin(defaultFolder, getFileName(defaultFolder), '.md') === absolutePath) return

    fileChangeQueue.addTask(newTitle, async () => {
      const changedFileAbsolutePath = await trpcClient.file.changeFileName.mutate({
        absolutePath: absolutePath,
        newName: newTitle + '.md'
      })
      if (!changedFileAbsolutePath) {
        console.warn('파일 이름 변경 실패:', absolutePath, newTitle)
        return
      }
      navigate({
        to: '/editor',
        replace: true,
        search: { absolutePath: changedFileAbsolutePath }
      })
      util.file.folderItems.invalidate({
        absolutePath: absolutePath.split('/').slice(0, -1).join('/')
      })
    })
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
        const isExistNewNote = await trpcClient.file.isExist.query({
          absolutePath: newFileAbsolutePath + '.md'
        })
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
