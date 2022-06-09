import { dbNow } from '@utils/dbNow'
import prisma from '@libs/client'
import { withApiSession } from '@libs/withSession'

import { NextApiRequest, NextApiResponse } from 'next'
import withHandler, { IResponse } from '@libs/withHandler'

async function handler(req: NextApiRequest, res: NextApiResponse<IResponse>) {
  try {
    const {
      body: { username, avatarId },
      session: { user },
    } = req

    const currentUser = await prisma.user.findUnique({
      where: {
        id: user?.id,
      },
      select: {
        id: true,
        username: true,
      },
    })

    if (!currentUser) {
      return res.json({
        ok: false,
        error: 'No Authorization.',
      })
    }

    if (username && username !== currentUser.username) {
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
          error: 'This username already exist.',
        })
      }
      await prisma.user.update({
        where: {
          id: currentUser.id,
        },
        data: {
          username,
          updatedAt: dbNow(),
        },
      })
    }
    if (avatarId) {
      await prisma.user.update({
        where: {
          id: currentUser.id,
        },
        data: {
          avatar: `${avatarId}`,
        },
      })
    }

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

export default withApiSession(withHandler({ methods: ['POST'], handler, isPrivate: true }))
