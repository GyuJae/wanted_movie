import prisma from '@libs/client'
import { withApiSession } from '@libs/withSession'

import * as bcrypt from 'bcrypt'

import { NextApiRequest, NextApiResponse } from 'next'
import withHandler, { IResponse } from '@libs/withHandler'

async function handler(req: NextApiRequest, res: NextApiResponse<IResponse>) {
  try {
    const {
      body: { email, password },
    } = req
    const existEmail = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        password: true,
      },
    })
    if (!existEmail) {
      return res.json({
        ok: false,
        error: 'This email does not exist',
      })
    }
    const isPasswordCheck = await bcrypt.compare(password, existEmail.password)
    if (!isPasswordCheck) {
      return {
        ok: false,
        error: 'Password not matched',
      }
    }
    req.session.user = {
      id: existEmail.id,
    }
    await req.session.save()
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

export default withApiSession(withHandler({ methods: ['POST'], handler, isPrivate: false }))
