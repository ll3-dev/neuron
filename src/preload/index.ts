import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { ipcApiSpec, IElectronAPI } from '../shared/ipc'

const api = Object.entries(ipcApiSpec).reduce((acc, [namespace, methods]) => {
  // @ts-ignore only used in preload
  acc[namespace as keyof IElectronAPI] = {}

  Object.keys(methods).forEach((methodName) => {
    const channel = `${namespace}:${methodName}`
    // @ts-ignore only used in preload
    acc[namespace as keyof IElectronAPI][methodName as keyof typeof methods] = (
      ...args: unknown[]
    ) => ipcRenderer.invoke(channel, ...args)
  })

  return acc
}, {} as IElectronAPI)

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
