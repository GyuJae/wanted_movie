import { IBookmarkResponse } from 'types/bookmark.d'
import prisma from '@libs/client'
import { withApiSession } from '@libs/withSession'
import withHandler from '@libs/withHandler'

import { NextApiRequest, NextApiResponse } from 'next'

async function handler(req: NextApiRequest, res: NextApiResponse<IBookmarkResponse>) {
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
      const bookmarks = await prisma.bookmark.findMany({})
      return res.json({
        ok: true,
        bookmarks,
      })
    }
    if (req.method === 'POST') {
      const {
        body: { mediaType, mediaId, posterPath, title, releaseDate, vote },
      } = req
      const existBookmark = await prisma.bookmark.findUnique({
        where: {
          userId_mediaId: {
            userId: currentUser.id,
            mediaId,
          },
        },
        select: {
          id: true,
        },
      })
      if (existBookmark) {
        return res.json({
          ok: false,
          error: 'already bookmark',
        })
      }
      await prisma.bookmark.create({
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
        body: { mediaId },
      } = req
      const bookmark = await prisma.bookmark.findUnique({
        where: {
          userId_mediaId: {
            userId: currentUser.id,
            mediaId: +mediaId,
          },
        },
        select: {
          id: true,
          userId: true,
        },
      })
      if (!bookmark) {
        return res.json({
          ok: false,
          error: 'this bookmark does not exist',
        })
      }
      if (bookmark.userId !== currentUser.id) {
        return res.json({
          ok: false,
          error: 'No Authorization',
        })
      }
      await prisma.bookmark.delete({
        where: {
          id: bookmark.id,
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
