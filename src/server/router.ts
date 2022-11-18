import { z } from 'zod'
import { procedure, router } from './trpc'

export const appRouter = router({
  healthcheck: procedure.query(() => {
    return 'Healthy'
  }),
  mutationCheck: procedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const result = input.text.toLocaleUpperCase()

      return result
    }),
})

export type AppRouter = typeof appRouter
