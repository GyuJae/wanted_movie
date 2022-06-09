import { ILikeResponse } from 'types/like'
import { dbNow } from 'utils/dbNow'
import prisma from '@libs/client'
import { withApiSession } from '@libs/withSession'
import withHandler from '@libs/withHandler'

import { NextApiRequest, NextApiResponse } from 'next'

async function handler(req: NextApiRequest, res: NextApiResponse<ILikeResponse>) {
  try {
    const {
      session: { user },
      query: { postId },
    } = req
    if (!postId || !user || !user.id) {
      return res.json({
        ok: false,
        error: 'post id is undefined',
      })
    }
    const currentUser = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        id: true,
      },
    })
    if (!currentUser) {
      return res.json({
        ok: false,
        error: 'Plz login',
      })
    }
    const post = await prisma.post.findUnique({
      where: {
        id: +postId,
      },
      select: {
        id: true,
      },
    })
    if (!post) {
      return res.json({
        ok: false,
        error: 'post is not exist',
      })
    }
    const like = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId: currentUser.id,
          postId: post.id,
        },
      },
    })

    if (req.method === 'GET') {
      return res.json({
        ok: true,
        isLike: !!like,
      })
    }
    if (req.method === 'POST') {
      if (like) {
        await prisma.like.delete({
          where: {
            id: like.id,
          },
        })
      } else {
        await prisma.like.create({
          data: {
            postId: post.id,
            userId: currentUser.id,
            createdAt: dbNow(),
            updatedAt: dbNow(),
          },
        })
      }
      return res.json({
        ok: true,
      })
    }

    return res.json({
      ok: false,
      error: 'error',
    })
  } catch (error) {
    return res.json({
      ok: false,
      error: error as string,
    })
  }
}

export default withApiSession(withHandler({ methods: ['POST', 'GET'], handler, isPrivate: true }))
