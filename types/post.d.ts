import { IResponse } from '@libs/withHandler'
import { Media, Post } from '@prisma/client'

export interface PostWithUser extends Post {
  user: {
    username: string
    avatar: string | null
  }
}

export interface IPostResponse extends IResponse {
  posts?: PostWithUser[]
}

export interface ICreatePostInput {
  text: string
  mediaType: Media
  mediaId: number
  posterPath: string
  mediaTitle: string
  vote: number
}

export interface IDeletePostInput {
  postId: number
}
