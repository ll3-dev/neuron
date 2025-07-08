import {
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
  EditorContent,
  type EditorInstance,
  EditorRoot,
  ImageResizer,
  JSONContent,
  handleCommandNavigation,
  handleImageDrop,
  handleImagePaste
} from 'novel'
import { uploadFn } from './imageUpload'
import { slashCommand, suggestionItems } from './slash-command'
import { defaultExtensions } from './extentions'

import '@renderer/assets/prosemirror.css'
import useNoteStore from '@renderer/store/useNoteStore'
import { useAppStore } from '@renderer/store/useAppStore'
import { useFileContentQuery } from '@renderer/hooks/query/useFolder'
import { useSearch } from '@tanstack/react-router'
import { useDebounce } from '@toss/react'

const extensions = [...defaultExtensions, slashCommand]

const Editor = () => {
  const { absolutePath } = useSearch({ from: '/editor' })
  const { titleFocus } = useNoteStore((state) => state.actions)
  const selectedTab = useAppStore((state) => state.selectedTab)
  const { data: content } = useFileContentQuery(absolutePath)

  const debouncedUpdates = useDebounce((editor: EditorInstance) => {
    console.log(selectedTab)
    if (!absolutePath || !editor.storage.markdown) return
    window.api.folder.saveFile(absolutePath, editor.storage.markdown.getMarkdown())
  }, 500)

  return (
    <div className="relative w-full">
      <EditorRoot>
        <EditorContent
          initialContent={content as unknown as JSONContent}
          extensions={extensions}
          className="relative border-muted bg-background sm:mb-[calc(20vh)] sm:rounded-lg"
          editorProps={{
            handleDOMEvents: {
              keydown: (view, event) => {
                handleCommandNavigation(event)
                if (event.key === 'ArrowUp' && view.state.selection.from === 1) {
                  titleFocus()
                }
              }
            },
            handlePaste: (view, event) => handleImagePaste(view, event, uploadFn),
            handleDrop: (view, event, _slice, moved) =>
              handleImageDrop(view, event, moved, uploadFn),
            attributes: {
              class:
                'prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full'
            },
            scrollThreshold: 100,
            scrollMargin: 100
          }}
          onUpdate={({ editor }) => {
            const { selection } = editor.state
            const viewportCoords = editor.view.coordsAtPos(selection.from)
            const absoluteOffset = window.scrollY + viewportCoords.top

            window.scrollTo(window.scrollX, absoluteOffset - 100)

            debouncedUpdates(editor)
          }}
          slotAfter={<ImageResizer />}
        >
          <EditorCommand className="z-50 h-auto max-h-64  overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
            <EditorCommandEmpty className="px-2 text-muted-foreground">
              No results
            </EditorCommandEmpty>
            <EditorCommandList>
              {suggestionItems.map((item) => (
                <EditorCommandItem
                  value={item.title}
                  onCommand={(val) => item.command?.(val)}
                  className="flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent"
                  key={item.title}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                </EditorCommandItem>
              ))}
            </EditorCommandList>
          </EditorCommand>
        </EditorContent>
      </EditorRoot>
    </div>
  )
}

export default Editor
