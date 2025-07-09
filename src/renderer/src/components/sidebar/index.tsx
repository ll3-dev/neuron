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
import { filterFilesSidebar, Tfile } from '@renderer/lib/file'
import { trpc, trpcClient } from '@renderer/lib/trpc'
import { DEFAULT_FOLDER_KEY } from '@renderer/constats/app'
import { useEffect, useState } from 'react'

function AppSidebar() {
  const [mainFolder, setMainFolder] = useState('')
  const { data: folderItems } = trpc.file.folderItems.useQuery(
    { absolutePath: mainFolder },
    { enabled: mainFolder !== '' }
  )

  useEffect(() => {
    const initSidebar = async () => {
      const mainFolder = await trpcClient.keyValue.getValue.mutate({ key: DEFAULT_FOLDER_KEY })
      if (mainFolder) {
        setMainFolder(mainFolder)
      }
    }

    initSidebar()
  }, [])

  if (!mainFolder || folderItems === undefined) {
    return null
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="h-6"></div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <span>{mainFolder.split('/').at(-1)}</span>
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
