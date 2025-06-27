export const getFileName = (filePath: string) => {
  const parts = filePath.split('/')
  const fileName = parts.pop()

  return fileName ? fileName.replace(/\.md$/, '') : ''
}
