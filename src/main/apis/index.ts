import { router } from '../actions/trpc'
import { filesRouter } from './files'
import { keyValueRouter } from './keyValue'

export const appRouter = router({
  file: filesRouter,
  keyValue: keyValueRouter
})
