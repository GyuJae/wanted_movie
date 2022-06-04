import { ILastBookmarkResponse } from 'types/bookmark.d'
import prisma from '@libs/client'
import { withApiSession } from '@libs/withSession'
import withHandler from '@libs/withHandler'

import { NextApiRequest, NextApiResponse } from 'next'

async function handler(req: NextApiRequest, res: NextApiResponse<ILastBookmarkResponse>) {
  try {
    if (!prisma) {
      return res.json({
        ok: false,
        error: 'Prisma is null',
      })
    }
    const {
      session: { user },
    } = req
    const currentUser = await prisma.user.findUnique({
      where: {
        id: user?.id,
      },
    })
    if (!currentUser) {
      return res.json({
        ok: false,
        error: 'User not found',
      })
    }
    const bookmark = await prisma.bookmark.findFirst({
      orderBy: {
        createdAt: 'desc',
      },
    })
    return res.json({
      ok: true,
      bookmark,
    })
  } catch (error) {
    return res.json({
      ok: false,
      error: error as string,
    })
  }
}

export default withApiSession(withHandler({ methods: ['GET'], handler, isPrivate: true }))
