import { TRPCError } from '@trpc/server'
import { prisma } from 'server/prisma'
import { publicProcedure } from 'server/trpc'
import { z } from 'zod'
import bcrypt from 'bcryptjs'

export const signUp = publicProcedure
  .input(
    z.object({
      email: z.string().email(),
      password: z.string().min(10).max(32),
    })
  )
  .mutation(async ({ input }) => {
    const { email, password } = input

    const userExists = await prisma.user.findFirst({
      where: {
        email,
      },
    })

    if (userExists) {
      throw new TRPCError({
        code: 'CONFLICT',
        message: 'Account with that email already exists',
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const result = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    })

    if (!result) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Something went wrong. Please try again.',
      })
    }

    return {
      id: result.id,
      email: result.email,
    }
  })
