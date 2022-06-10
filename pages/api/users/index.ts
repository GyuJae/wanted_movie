import { dbNow } from '@utils/dbNow'
import prisma from '@libs/client'

import * as bcrypt from 'bcrypt'

import { NextApiRequest, NextApiResponse } from 'next'
import withHandler, { IResponse } from '@libs/withHandler'

async function handler(req: NextApiRequest, res: NextApiResponse<IResponse>) {
  try {
    const {
      body: { email, password, username },
    } = req
    const existEmail = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    })
    if (existEmail) {
      return res.json({
        ok: false,
        error: 'This email already exists.',
      })
    }
    const existUsername = await prisma.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
      },
    })
    if (existUsername) {
      return res.json({
        ok: false,
        error: 'This username already exists.',
      })
    }

    const hashPassword = await bcrypt.hash(password, 10)
    await prisma.user.create({
      data: {
        email,
        username,
        password: hashPassword,
        createdAt: dbNow(),
        updatedAt: dbNow(),
      },
    })
    return res.json({
      ok: true,
    })
  } catch (error) {
    return res.json({
      ok: false,
      error: error as string,
    })
  }
}

export default withHandler({ methods: ['POST'], handler, isPrivate: false })
