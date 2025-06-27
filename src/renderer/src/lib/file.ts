export const getFileName = (filePath: string, exts = ['md']) => {
  const parts = filePath.split('/')
  const fileName = parts.pop()

  if (!fileName) return ''
  const ext = fileName.split('.').pop()
  if (!ext || !exts.includes(ext)) return fileName

  return fileName.slice(0, -(ext.length + 1))
}

export type Tfile = Awaited<ReturnType<typeof window.api.folder.folderItems>>[number]

export const filterFilesByExt = (files: Tfile[], exts: string[], folderEnable = false) =>
  files.filter((file) => {
    if (file.isDirectory) return folderEnable
    const ext = file.name.split('.').pop()
    return ext && exts.includes(ext)
  })

export const filterFilesSidebar = (files: Tfile[]) => filterFilesByExt(files, ['md', 'mdx'], true)
