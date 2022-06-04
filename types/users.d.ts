import { IResponse } from '@libs/withHandler'
import { User } from '@prisma/client'

export interface ICreateAccountInput {
  email: string
  username: string
  password: string
}

export interface ILoginInput {
  email: string
  password: string
}

export interface IUserExtendBookmark extends User {
  Bookmark: { mediaId: number }[]
}

export interface IMeResponse extends IResponse {
  user?: IUserExtendBookmark
}

export interface IEditProfileInput {
  username?: string
  avatarId?: number
}
