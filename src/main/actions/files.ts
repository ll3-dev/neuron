import { dialog } from 'electron'
import { existsSync } from 'fs'
import { readdir, writeFile, rm, readFile, stat, rename } from 'fs/promises'

export const selectMainFolder = () =>
  dialog.showOpenDialog({
    properties: ['openDirectory']
  })

export const folderItems = (folderPath: string) =>
  readdir(folderPath, { withFileTypes: true })
    .then(async (items) => {
      const isFileExist = await Promise.all(items.map((item) => stat(`${folderPath}/${item.name}`)))

      return (
        items.map((item, index) => ({
          name: item.name,
          absolutePath: `${folderPath}/${item.name}`,
          isDirectory: item.isDirectory(),
          isFile: item.isFile(),
          isSymbolicLink: item.isSymbolicLink(),
          size: isFileExist[index]?.size || 0
        })) ?? []
      )
    })
    .catch((error) => {
      console.error('Error reading folder items:', error)
      return []
    })

export const saveFile = (filePath: string, content: string) => writeFile(filePath, content, 'utf-8')

export const readFileContent = (filePath: string) =>
  readFile(filePath, 'utf-8')
    .then((content) => content)
    .catch((error) => {
      console.error('Error reading file content:', error)
      throw error
    })

export const deleteFile = (filePath: string) =>
  dialog
    .showMessageBox({
      type: 'warning',
      buttons: ['Cancel', 'Delete'],
      defaultId: 1,
      title: '파일을 제거하시겠나요?',
      message: `파일을 제거하시겠나요? 이 ${filePath.split('/').at(-1)}은 영구적으로 제거됩니다.`
    })
    .then((result) => {
      if (result.response === 1) {
        return rm(filePath, { force: true, recursive: false })
      }
      return Promise.reject(new Error('Deletion cancelled by user'))
    })
    .catch((error) => {
      console.error('Error deleting file:', error)
      throw error
    })

export const deleteFolder = (folderPath: string) =>
  dialog
    .showMessageBox({
      type: 'warning',
      buttons: ['Cancel', 'Delete'],
      defaultId: 1,
      title: '폴더를 제거하시겠나요?',
      message: `폴더를 제거하시겠나요? 이 ${folderPath.split('/').at(-1)}은 영구적으로 제거됩니다.`
    })
    .then((result) => {
      if (result.response === 1) {
        return rm(folderPath, { force: true, recursive: true })
      }
      return Promise.reject(new Error('Deletion cancelled by user'))
    })
    .catch((error) => {
      console.error('Error deleting folder:', error)
      throw error
    })

export const isExist = (filePath: string) => existsSync(filePath)

export const changeFileName = async (filePath: string, newName: string) => {
  const newFilePath = filePath.replace(/[^/]+$/, newName)

  return rename(filePath, newFilePath)
    .then(() => newFilePath)
    .catch((error) => {
      console.error('Error changing file name:', error)
      throw error
    })
}

export const fileStat = async (filePath: string) =>
  stat(filePath)
    .then((stat) => ({
      name: filePath.split('/').at(-1) || '',
      absolutePath: filePath,
      size: stat.size,
      isFile: stat.isFile(),
      isDirectory: stat.isDirectory(),
      isSymbolicLink: stat.isSymbolicLink()
    }))
    .catch((error) => {
      console.error('Error getting file stats:', error)
      throw error
    })
