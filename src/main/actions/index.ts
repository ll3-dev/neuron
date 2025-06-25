import { dialog, ipcMain } from 'electron'
import { deleteValue, getValue, setValue } from '../database/KeyValue'

export const handlerRegister = () => {
  ipcMain.handle('keyValueStore:get', (_, ...args) => getValue(args[0]))
  ipcMain.handle('keyValueStore:set', (_, ...args) => setValue(args[0], args[1]))
  ipcMain.handle('keyValueStore:delete', (_, ...args) => deleteValue(args[0]))
  ipcMain.handle('selectMainFolder', () =>
    dialog.showOpenDialog({
      properties: ['openDirectory']
    })
  )
}
