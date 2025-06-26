import { ElectronAPI } from '@electron-toolkit/preload'
import { IElectronAPI } from '../shared/ipc'

declare global {
  interface Window {
    electron: ElectronAPI
    api: IElectronAPI
  }
}
