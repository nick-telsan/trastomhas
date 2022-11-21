import { router } from 'server/trpc'
import { signUp } from './controllers/sign-up'

export const authRouter = router({
  signUp,
})
