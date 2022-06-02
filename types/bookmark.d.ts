import { IResponse } from '@libs/withHandler'
import { Bookmark, Media } from '@prisma/client'

export interface IBookmarkResponse extends IResponse {
  bookmarks?: Bookmark[]
}

export interface ICreateBookmarkInput {
  mediaType: Media
  mediaId: number
  posterPath: string
  title: string
  releaseDate: string
  vote: number
}

export interface IDeleteBookmarkInput {
  bookmarkId: number
}
