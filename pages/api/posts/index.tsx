import { IPostResponse } from 'types/post'
import prisma from '@libs/client'
import { withApiSession } from '@libs/withSession'
import withHandler from '@libs/withHandler'

import { NextApiRequest, NextApiResponse } from 'next'

async function handler(req: NextApiRequest, res: NextApiResponse<IPostResponse>) {
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
    if (req.method === 'GET') {
      const posts = await prisma.post.findMany({
        include: {
          user: {
            select: {
              avatar: true,
              username: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      })
      return res.json({
        ok: true,
        posts,
      })
    }
    if (req.method === 'POST') {
      const {
        body: { text, mediaType, mediaId, posterPath, mediaTitle, vote },
      } = req
      await prisma.post.create({
        data: {
          text,
          mediaType,
          mediaId: +mediaId,
          posterPath,
          mediaTitle,
          vote: +vote,
          userId: currentUser.id,
        },
      })
      return res.json({
        ok: true,
      })
    }
    if (req.method === 'DELETE') {
      const {
        body: { postId },
      } = req
      const post = await prisma.post.findUnique({
        where: {
          id: +postId,
        },
        select: {
          id: true,
          userId: true,
        },
      })
      if (!post) {
        return res.json({
          ok: false,
          error: 'this post does not exist',
        })
      }
      if (post.userId !== currentUser.id) {
        return res.json({
          ok: false,
          error: 'No Authorization',
        })
      }
      await prisma.post.delete({
        where: {
          id: post.id,
        },
      })
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

export default withApiSession(withHandler({ methods: ['POST', 'GET', 'DELETE'], handler, isPrivate: true }))
