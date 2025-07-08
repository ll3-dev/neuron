import { ChevronRight, FileText } from 'lucide-react'
import { SidebarMenuButton, SidebarMenuItem, SidebarMenuSub } from '../ui/sidebar'
import { useFolderItemsQuery } from '@renderer/hooks/query/useFolder'
import { useReducer } from 'react'
import { Collapsible, CollapsibleContent } from '../ui/collapsible'
import { filePathJoin, filterFilesSidebar, getFileName, Tfile } from '@renderer/lib/file'
import { Button } from '../ui/button'
import { cn } from '@renderer/lib/utils'
import useNoteStore from '@renderer/store/useNoteStore'
import { useNavigate } from '@tanstack/react-router'
import { useAppStore } from '@renderer/store/useAppStore'

interface SidebarItemsProps {
  file: Tfile
}

const SidebarItems = ({ file }: SidebarItemsProps) => {
  const [isOpen, toggleOpen] = useReducer((state) => !state, false)
  const { setContent } = useNoteStore((state) => state.actions)
  const { setSelectedTab } = useAppStore((state) => state.actions)
  const { data: folderItems } = useFolderItemsQuery(file.absolutePath, file.isDirectory && isOpen)
  const navigate = useNavigate()

  const onClickFileButton = async () => {
    let selectedTab = file.absolutePath
    let content: string | undefined = undefined
    try {
      if (file.isFile) {
        content = await window.api.folder.readFileContent(file.absolutePath)
      } else {
        content = await window.api.folder.readFileContent(
          filePathJoin(file.absolutePath, file.name + '.md')
        )
        selectedTab = filePathJoin(file.absolutePath, file.name + '.md')
      }
    } catch (error) {
      if (content === undefined) {
        console.warn('파일을 읽어올 수 없습니다:', file.absolutePath, error)
        const absolutePath = filePathJoin(file.absolutePath, file.name + '.md')
        await window.api.folder.saveFile(absolutePath, '')
        selectedTab = absolutePath
      }
    } finally {
      setSelectedTab(selectedTab)
      setContent(content ?? '')
      navigate({
        to: '/editor',
        replace: true,
        search: { absolutePath: selectedTab }
      })
    }
  }

  const endFileName = file.name.split('/').at(-1) || ''
  const mdAndFolerFiles = filterFilesSidebar(folderItems ?? []).filter(
    (file) => file.name !== endFileName && file.isDirectory
  )

  return (
    <SidebarMenuItem>
      <Collapsible open={isOpen} onOpenChange={toggleOpen}>
        <div className="relative">
          <Button
            size="icon"
            variant="ghost"
            onClick={toggleOpen}
            className="absolute left-0 top-0 h-full group/icons"
          >
            <ChevronRight
              className={cn(
                'absolute opacity-0 transition-all group-hover/icons:opacity-100 duration-300',
                {
                  'rotate-90 opacity-100': isOpen
                }
              )}
            />
            <FileText
              className={cn(
                'absolute opacity-100 group-hover/icons:opacity-0 transition-opacity duration-300',
                {
                  'opacity-0': isOpen
                }
              )}
            />
          </Button>
          <SidebarMenuButton
            onClick={onClickFileButton}
            className="truncate pl-10 pr-2 hover:bg-accent hover:text-accent-foreground flex items-center"
          >
            <span>{getFileName(file.name)}</span>
          </SidebarMenuButton>
        </div>
        <CollapsibleContent>
          <SidebarMenuSub>
            {!mdAndFolerFiles || mdAndFolerFiles.length === 0 ? (
              <SidebarMenuItem className="truncate">
                <span className="text-muted-foreground">하위에 노트가 없어요.</span>
              </SidebarMenuItem>
            ) : (
              mdAndFolerFiles.map((file) => <SidebarItems key={file.name} file={file} />)
            )}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  )
}

export default SidebarItems
