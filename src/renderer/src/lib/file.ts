import { trpcClient } from './trpc'

export const getFileName = (filePath: string, exts = ['md']) => {
  const parts = filePath.split('/')
  const fileName = parts.pop()

  if (!fileName) return ''
  const ext = fileName.split('.').pop()
  if (!ext || !exts.includes(ext)) return fileName

  return fileName.slice(0, -(ext.length + 1))
}

export type Tfile = Awaited<ReturnType<typeof trpcClient.file.folderItems.query>>[number]

export const filterFilesByExt = (files: Tfile[], exts: string[], folderEnable = false) =>
  files.filter((file) => {
    if (file.isDirectory) return folderEnable
    const ext = file.name.split('.').pop()
    return ext && exts.includes(ext)
  })

export const filterFilesSidebar = (files: Tfile[]) => filterFilesByExt(files, ['md', 'mdx'], true)

export const filePathJoin = (base: string, ...paths: string[]) => {
  const normalizedBase = base.endsWith('/') ? base.slice(0, -1) : base
  return paths.reduce((acc, path) => {
    const normalizedPath = path.startsWith('/') ? path.slice(1) : path
    return `${acc}/${normalizedPath}`
  }, normalizedBase)
}

export const getNoteFilePath = async (absolutePath: string) => {
  const stat = await trpcClient.file.fileStat.query({ absolutePath })
  if (stat.isDirectory) {
    return filePathJoin(absolutePath, getFileName(absolutePath) + '.md')
  }
  return absolutePath
}
