import { Comment } from '@prisma/client'
import { IResponse } from '@libs/withHandler'

export interface ICommentWithUser extends Comment {
  user: {
    id: number
    username: string
    avatar: string | null
  }
}

export interface ICommentResponse extends IResponse {
  comments?: ICommentWithUser[]
  totalCount?: number
  totalPage?: number
  page?: number
}

export interface IDeleteCommentInput {
  commentId: number
}

export interface ICreateCommentInput {
  comment: string
  postId: number
}
