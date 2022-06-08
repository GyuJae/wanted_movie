import { IResponse } from '@libs/withHandler'
import { Comment, Media, Post } from '@prisma/client'

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

export interface IDetailPost extends Post {
  user: {
    id: number
    username: string
    avatar: string | null
  }
  Comment: Comment[]
  _count: {
    Like: number
    Comment: number
  }
}

export interface IDetailPostResponse extends IResponse {
  post?: IDetailPost
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

export interface IDetailPostInput {
  postId: number
}
