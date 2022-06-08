import { IResponse } from '@libs/withHandler'

export interface ILikeResponse extends IResponse {
  isLike?: boolean
}

export interface IToggleLikeInput {
  postId: number
}
