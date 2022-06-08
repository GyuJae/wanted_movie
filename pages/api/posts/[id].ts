import { IDetailPostResponse } from 'types/post'
import prisma from '@libs/client'
import { withApiSession } from '@libs/withSession'
import withHandler from '@libs/withHandler'

import { NextApiRequest, NextApiResponse } from 'next'

async function handler(req: NextApiRequest, res: NextApiResponse<IDetailPostResponse>) {
  try {
    const {
      session: { user },
      query: { id },
    } = req
    const currentUser = await prisma.user.findUnique({
      where: {
        id: user?.id,
      },
      select: {
        id: true,
      },
    })
    if (!currentUser) {
      return res.json({
        ok: false,
        error: 'Plz Login',
      })
    }

    const post = await prisma.post.findUnique({
      where: {
        id: +id,
      },
      include: {
        Comment: true,
        user: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
      },
    })

    if (!post) {
      return res.json({
        ok: false,
        error: 'Post not found',
      })
    }

    return res.json({
      ok: true,
      post,
    })
  } catch (error) {
    return res.json({
      ok: false,
      error: error as string,
    })
  }
}

export default withApiSession(withHandler({ methods: ['GET'], handler, isPrivate: true }))
