import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarRail
} from '@renderer/components/ui/sidebar'
import SidebarItmes from '@renderer/components/sidebar/SidebarItems'
import { useFolderItemsQuery, useMainFolderQuery } from '@renderer/hooks/query/useFolder'
import { filterFilesSidebar, Tfile } from '@renderer/lib/file'

function AppSidebar() {
  const { data: mainFolder } = useMainFolderQuery()
  const { data: folderItems } = useFolderItemsQuery(mainFolder ?? '', !!mainFolder)

  if (!mainFolder || folderItems === undefined) {
    return null
  }

  const directoryName = mainFolder.split('/').at(-1) || '홈'

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="h-6"></div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <span>{directoryName}</span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filterFilesSidebar(folderItems).map((file: Tfile) => (
                <SidebarItmes key={file.name} file={file} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
export default AppSidebar
