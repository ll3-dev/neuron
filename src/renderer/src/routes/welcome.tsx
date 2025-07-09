import WelcomeTitlebar from '@renderer/components/titlebar/welcome'
import { Button } from '@renderer/components/ui/button'
import { DEFAULT_FOLDER_KEY } from '@renderer/constats/app'
import { trpc } from '@renderer/lib/trpc'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/welcome')({
  component: RouteComponent
})

function RouteComponent() {
  const navigate = useNavigate()
  const [selectedFolder, setSelectedFolder] = useState('')
  const { mutate: selectMainFolder } = trpc.file.selectMainFolder.useMutation()
  const { mutate: setValue } = trpc.keyValue.setValue.useMutation()

  const onSelectFolder = () => {
    selectMainFolder(undefined, {
      onSuccess: (folder) => {
        if (folder?.canceled) {
          return
        }
        if (folder?.filePaths.length) {
          const mainFolder = folder.filePaths[0]
          setSelectedFolder(mainFolder)
        }
      }
    })
  }

  const onGotoMain = () => {
    setValue(
      {
        key: DEFAULT_FOLDER_KEY,
        value: selectedFolder
      },
      {
        onSuccess: () => {
          navigate({
            to: '/editor',
            replace: true,
            search: { absolutePath: selectedFolder }
          })
        },
        onError: (error) => {
          console.error('폴더 설정 실패:', error)
        }
      }
    )
  }

  return (
    <div>
      <WelcomeTitlebar />
      <main className="flex flex-col gap-4 justify-center min-h-[calc(100dvh-3.25rem)] items-center pb-13">
        <h1 className="text-4xl font-bold mb-8">환영합니다!</h1>
        <div>먼저 폴더를 선택해 주세요</div>
        <div className="flex min-w-72 border border-gray-500 rounded-lg">
          <span className="bg-black text-white p-2 rounded-l-lg">선택된 폴더</span>
          <span className="p-2 px-4">{selectedFolder}</span>
        </div>
        <div className="flex gap-4 select-none mt-8">
          <Button
            size="lg"
            variant={selectedFolder === '' ? 'default' : 'outline'}
            onClick={onSelectFolder}
            className="cursor-pointer"
          >
            폴더 선택하세요
          </Button>
          <Button
            size="lg"
            disabled={selectedFolder === ''}
            className="cursor-pointer disabled:cursor-not-allowed"
            onClick={onGotoMain}
          >
            다음으로 넘어가기
          </Button>
        </div>
      </main>
    </div>
  )
}
