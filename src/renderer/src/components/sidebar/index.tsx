import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail
} from '@renderer/components/ui/sidebar'
import { useDirectoryItemsMutate, useMainFolderQuery } from '@renderer/hooks/query/useFolder'
import { useEffect, useState } from 'react'

type DirectoryItems = Awaited<ReturnType<typeof window.api.folder.folderItems>>

function AppSidebar() {
  const { data: mainFolder } = useMainFolderQuery()
  const { mutate: getDirectoryItems } = useDirectoryItemsMutate()
  const [directoryItems, setDirectoryItems] = useState<DirectoryItems | null>(null)

  useEffect(() => {
    if (mainFolder) {
      getDirectoryItems(mainFolder, {
        onSuccess: (items) => {
          setDirectoryItems(items ?? [])
        }
      })
    }
  }, [mainFolder, getDirectoryItems])

  if (!mainFolder || !directoryItems) {
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
          <SidebarGroupLabel>{directoryName}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {directoryItems.map(({ name }) => (
                <SidebarMenuItem key={name}>
                  <SidebarMenuButton asChild>
                    <span>{name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
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
