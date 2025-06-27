import { ipcMain } from 'electron'
import { deleteValue, getValue, setValue } from '../main/database/KeyValue'
import {
  changeFileName,
  deleteFile,
  deleteFolder,
  folderItems,
  isExistFileOrFolder,
  readFileContent,
  saveFile,
  selectMainFolder
} from '../main/actions/files'

export const ipcApiSpec = {
  keyValueStore: {
    getValue,
    setValue,
    deleteValue
  },
  folder: {
    selectMainFolder,
    folderItems,
    saveFile,
    readFileContent,
    deleteFile,
    deleteFolder,
    isExistFileOrFolder,
    changeFileName
  }
}

export type IElectronAPI = typeof ipcApiSpec

export const registerIpcHandlers = () => {
  Object.entries(ipcApiSpec).forEach(([namespace, methods]) => {
    Object.entries(methods).forEach(([methodName, handler]) => {
      const channel = `${namespace}:${methodName}`
      console.log(`Registering IPC handler for channel: ${channel}`)

      ipcMain.handle(channel, async (_, ...args) => {
        try {
          // @ts-ignore args type is not strictly defined
          return await handler(...args)
        } catch (error) {
          console.error(`Error in handler for ${channel}:`, error)
          throw error
        }
      })
    })
  })
}
