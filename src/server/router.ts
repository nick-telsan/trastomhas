import { authRouter } from './modules/auth/router'
import { publicProcedure, router } from './trpc'

export const appRouter = router({
  healthcheck: publicProcedure.query(() => {
    return 'Healthy'
  }),
  auth: authRouter,
})

export type AppRouter = typeof appRouter
