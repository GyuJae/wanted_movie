import { IResponse } from '@libs/withHandler'
import { Media, Post } from '@prisma/client'

export interface PostWithUserAndCount extends Post {
  user: {
    username: string
    avatar: string | null
  }
  _count: {
    Like: number
    Comment: number
  }
}

export interface IPostResponse extends IResponse {
  posts?: PostWithUserAndCount[]
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
