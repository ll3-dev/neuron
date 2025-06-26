import { dialog } from 'electron'
import { readdir } from 'fs/promises'

export const selectMainFolder = () =>
  dialog.showOpenDialog({
    properties: ['openDirectory']
  })

export const folderItems = (folderPath: string) =>
  readdir(folderPath, { withFileTypes: true })
    .then((items) =>
      items.map((item) => ({
        name: item.name,
        isDirectory: item.isDirectory(),
        isFile: item.isFile(),
        isSymbolicLink: item.isSymbolicLink()
      }))
    )
    .catch((error) => {
      console.error('Error reading folder items:', error)
      return []
    })
