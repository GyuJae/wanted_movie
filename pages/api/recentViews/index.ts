import { IRecentViewResponse } from 'types/recent.d'
import prisma from '@libs/client'
import { withApiSession } from '@libs/withSession'
import withHandler from '@libs/withHandler'

import { NextApiRequest, NextApiResponse } from 'next'

async function handler(req: NextApiRequest, res: NextApiResponse<IRecentViewResponse>) {
  try {
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
      const {
        query: { page },
      } = req
      const recentViews = await prisma.recentView.findMany({
        where: {
          userId: currentUser.id,
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip: 25 * (+page - 1),
        take: 25,
      })
      const totalCount = await prisma.recentView.count({
        where: {
          userId: currentUser.id,
        },
      })
      return res.json({
        ok: true,
        recentViews,
        totalCount,
        totalPage: Math.ceil(totalCount / 25),
        page: +page,
      })
    }
    if (req.method === 'POST') {
      const {
        body: { mediaType, mediaId, posterPath, title, releaseDate, vote },
      } = req
      const existRecentView = await prisma.recentView.findUnique({
        where: {
          userId_mediaId: {
            userId: currentUser.id,
            mediaId: +mediaId,
          },
        },
        select: {
          mediaId: true,
        },
      })
      if (existRecentView) {
        await prisma.recentView.delete({
          where: {
            userId_mediaId: {
              userId: currentUser.id,
              mediaId: existRecentView.mediaId,
            },
          },
        })
      }
      await prisma.recentView.create({
        data: {
          mediaType,
          mediaId: +mediaId,
          posterPath,
          title,
          releaseDate,
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
        body: { recentViewId },
      } = req
      const recentView = await prisma.recentView.findUnique({
        where: {
          id: +recentViewId,
        },
        select: {
          id: true,
          userId: true,
        },
      })
      if (!recentView) {
        return res.json({
          ok: false,
          error: 'this recent does not exist',
        })
      }
      if (recentView.userId !== currentUser.id) {
        return res.json({
          ok: false,
          error: 'No Authorization',
        })
      }
      await prisma.recentView.delete({
        where: {
          id: recentView.id,
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
