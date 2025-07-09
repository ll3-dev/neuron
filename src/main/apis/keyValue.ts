import { publicProcedure, router } from '../actions/trpc'
import { z } from 'zod'
import { deleteValue, getValue, setValue } from '../database/KeyValue'

export const keyValueRouter = router({
  getValue: publicProcedure
    .input(z.object({ key: z.string() }))
    .mutation(({ input }) => getValue(input.key)),
  setValue: publicProcedure
    .input(z.object({ key: z.string(), value: z.string() }))
    .mutation(({ input }) => setValue(input.key, input.value)),
  deleteValue: publicProcedure
    .input(z.object({ key: z.string() }))
    .mutation(({ input }) => deleteValue(input.key))
})
