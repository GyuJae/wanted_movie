/* eslint-disable vars-on-top */
import { PrismaClient } from '@prisma/client'

declare global {
  // eslint-disable-next-line vars-on-top
  // eslint-disable-next-line no-var
  var prisma: PrismaClient
}

// eslint-disable-next-line import/no-mutable-exports
let prisma: PrismaClient | null = null

if (typeof window === 'undefined') {
  if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient()
  } else {
    if (!global.prisma) {
      global.prisma = new PrismaClient()
    }

    // eslint-disable-next-line prefer-destructuring
    prisma = global.prisma
  }
}

export default prisma
