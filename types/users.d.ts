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

export interface IMeResponse extends IResponse {
  user?: User
}
