import { IResponse } from '@libs/withHandler'
import { Bookmark, Media } from '@prisma/client'

export interface IBookmarkResponse extends IResponse {
  bookmarks?: Bookmark[]
  totalCount?: number
  totalPage?: number
  page?: number
}

export interface ILastBookmarkResponse extends IResponse {
  bookmark?: Bookmark | null
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
  mediaId: number
}
