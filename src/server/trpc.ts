import { initTRPC } from '@trpc/server'

// Avoid exporting the entire t-object since it's not very descriptive.
const t = initTRPC.create()

export const router = t.router
export const publicProcedure = t.procedure
