import { SidebarTrigger, useSidebar } from '@renderer/components/ui/sidebar'
import { cn } from '@renderer/lib/utils'
import { useAppStore } from '@renderer/store/useAppStore'
import useNoteStore from '@renderer/store/useNoteStore'
import { useCallback, useEffect } from 'react'

const TitleBar = () => {
  const { open, width } = useSidebar()
  const title = useNoteStore((state) => state.title)
  const isHeaderVisible = useAppStore((state) => state.isHeaderVisible)
  const { setHeaderVisibility } = useAppStore((state) => state.actions)

  const onHeaderVisibilityChange = useCallback(() => {
    setHeaderVisibility(true)
  }, [setHeaderVisibility])

  const offHeaderVisibility = useCallback(() => {
    setHeaderVisibility(false)
  }, [setHeaderVisibility])

  useEffect(() => {
    document.addEventListener('mousemove', onHeaderVisibilityChange)
    document.addEventListener('wheel', onHeaderVisibilityChange)

    document.addEventListener('keydown', offHeaderVisibility)
    return () => {
      document.removeEventListener('mousemove', onHeaderVisibilityChange)
      document.removeEventListener('wheel', onHeaderVisibilityChange)

      document.removeEventListener('keydown', offHeaderVisibility)
    }
  }, [onHeaderVisibilityChange, offHeaderVisibility])

  return (
    <div
      className={cn(
        'fixed draggable-app h-13 w-screen flex top-0 left-0 z-50 items-center transition-opacity duration-500 bg-transparent',
        {
          'opacity-0': !isHeaderVisible
        }
      )}
    >
      <div
        style={{
          width: open ? `${width}` : undefined
        }}
      >
        <SidebarTrigger className="ml-20" />
      </div>
      <div
        className={cn(
          'px-5 transition-[padding] bg-background flex-1 w-full h-full flex items-center'
        )}
      >
        {title}
      </div>
    </div>
  )
}

export default TitleBar
