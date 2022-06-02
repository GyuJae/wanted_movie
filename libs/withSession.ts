import { withIronSessionApiRoute } from 'iron-session/next'

declare module 'iron-session' {
  interface IronSessionData {
    user?: {
      id: number
    }
  }
}

const cookieOptions = {
  cookieName: 'wantedMovieSession',
  password: 'aiounwecio32h484hdjkhf832nkjlnlds!@jdiji88d2nksi123@@',
}

export function withApiSession(fn: any) {
  return withIronSessionApiRoute(fn, cookieOptions)
}
