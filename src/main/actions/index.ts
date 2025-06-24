import { ipcMain } from 'electron'
import { getValue, setValue } from '../database/KeyValue'

export const handlerRegister = () => {
  ipcMain.handle('keyValueStore:get', (_, ...args) => getValue(args[0]))
  ipcMain.handle('keyValueStore:set', (_, ...args) => setValue(args[0], args[1]))
}
