import { IMeResponse } from 'types/users'
import prisma from '@libs/client'
import { withApiSession } from '@libs/withSession'
import withHandler from '@libs/withHandler'

import { NextApiRequest, NextApiResponse } from 'next'

async function handler(req: NextApiRequest, res: NextApiResponse<IMeResponse>) {
  try {
    const {
      session: { user },
    } = req
    if (!user) {
      return res.json({
        ok: false,
        error: 'user not exist',
      })
    }
    const currentUser = await prisma.user.findUnique({
      where: { id: user.id },
    })
    if (!currentUser) {
      return res.json({
        ok: false,
        error: 'user not exist',
      })
    }
    return res.json({
      ok: true,
      user: currentUser,
    })
  } catch (error) {
    return res.json({
      ok: false,
      error: error as string,
    })
  }
}

export default withApiSession(withHandler({ methods: ['GET'], handler, isPrivate: false }))
