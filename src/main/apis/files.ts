import {
  changeFileName,
  deleteFile,
  deleteFolder,
  fileStat,
  folderItems,
  isExist,
  readFileContent,
  saveFile,
  selectMainFolder
} from '../actions/files'
import { publicProcedure, router } from '../actions/trpc'
import { z } from 'zod'

export const filesRouter = router({
  selectMainFolder: publicProcedure.mutation(selectMainFolder),
  folderItems: publicProcedure
    .input(z.object({ absolutePath: z.string() }))
    .query(({ input }) => folderItems(input.absolutePath)),
  saveFile: publicProcedure
    .input(z.object({ absolutePath: z.string(), content: z.string() }))
    .mutation(({ input }) => saveFile(input.absolutePath, input.content)),
  readFileContent: publicProcedure
    .input(z.object({ absolutePath: z.string() }))
    .query(({ input }) => readFileContent(input.absolutePath)),
  deleteFile: publicProcedure
    .input(z.object({ absolutePath: z.string() }))
    .mutation(({ input }) => deleteFile(input.absolutePath)),
  deleteFolder: publicProcedure
    .input(z.object({ absolutePath: z.string() }))
    .mutation(({ input }) => deleteFolder(input.absolutePath)),
  isExist: publicProcedure
    .input(z.object({ absolutePath: z.string() }))
    .query(({ input }) => isExist(input.absolutePath)),
  changeFileName: publicProcedure
    .input(z.object({ absolutePath: z.string(), newName: z.string() }))
    .mutation(({ input }) => changeFileName(input.absolutePath, input.newName)),
  fileStat: publicProcedure
    .input(z.object({ absolutePath: z.string() }))
    .query(({ input }) => fileStat(input.absolutePath))
})
