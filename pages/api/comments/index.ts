import { ICommentResponse } from 'types/comment'
import prisma from '@libs/client'
import { withApiSession } from '@libs/withSession'
import withHandler from '@libs/withHandler'

import { NextApiRequest, NextApiResponse } from 'next'

async function handler(req: NextApiRequest, res: NextApiResponse<ICommentResponse>) {
  try {
    const {
      session: { user },
      query: { postId },
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
    if (!postId) {
      return res.json({
        ok: false,
        error: 'post id is undefined.',
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
      return res.json({ ok: false, error: 'post does not exist.' })
    }
    if (req.method === 'GET') {
      const {
        body: { page },
      } = req
      const comments = await prisma.comment.findMany({
        where: {
          postId: +postId,
        },
        skip: 25 * (+page - 1),
        take: 25,
        include: {
          user: {
            select: {
              id: true,
              avatar: true,
              username: true,
            },
          },
        },
      })

      const totalCount = await prisma.comment.count({
        where: {
          postId: +postId,
        },
      })
      return res.json({
        ok: true,
        comments,
        totalCount,
        totalPage: Math.ceil(totalCount / 25),
      })
    }
    if (req.method === 'POST') {
      const {
        body: { comment },
      } = req
      await prisma.comment.create({
        data: {
          comment,
          userId: currentUser.id,
          postId: post.id,
        },
      })
      return res.json({
        ok: true,
      })
    }
    if (req.method === 'DELETE') {
      const {
        body: { commentId },
      } = req
      const comment = await prisma.comment.findUnique({
        where: {
          id: +commentId,
        },
        select: {
          id: true,
          userId: true,
        },
      })
      if (!comment) {
        return res.json({
          ok: false,
          error: 'this comment is not exist',
        })
      }
      if (comment.userId !== currentUser.id) {
        return res.json({
          ok: false,
          error: 'No Authorization',
        })
      }
      await prisma.comment.delete({
        where: {
          id: comment.id,
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
