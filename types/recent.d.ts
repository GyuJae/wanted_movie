import { IResponse } from '@libs/withHandler'
import { Media, RecentView } from '@prisma/client'

export interface IRecentViewResponse extends IResponse {
  recentViews?: RecentView[]
  totalCount?: number
  totalPage?: number
  page?: number
}

export interface ILastRecentViewResponse extends IResponse {
  recentView?: RecentView | null
}

export interface ICreateRecentViewInput {
  mediaType: Media
  mediaId: number
  posterPath: string
  title: string
  releaseDate: string
  vote: number
}

export interface IDeleteRecentViewInput {
  recentViewId: number
}
