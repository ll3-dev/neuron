import { SidebarTrigger, useSidebar } from '@renderer/components/ui/sidebar'

const TitleBar = () => {
  const { open, width } = useSidebar()

  return (
    <div className="fixed draggable-app h-10 w-screen flex top-0 left-0 z-50 items-center">
      <div
        className="transition-all duration-200 ease-in-out"
        style={{
          paddingLeft: open ? `calc(${width} - 3rem)` : `calc(var(--spacing) * 18)`
        }}
      >
        {/* padding  */}
      </div>
      <SidebarTrigger />
    </div>
  )
}

export default TitleBar
