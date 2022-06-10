import { NextApiRequest, NextApiResponse } from 'next'

export interface IResponse {
  ok: boolean
  error?: string
}

type method = 'GET' | 'POST' | 'DELETE'

interface ConfigType {
  methods: method[]
  handler: (req: NextApiRequest, res: NextApiResponse) => void
  isPrivate?: boolean
}

export default function withHandler({ methods, isPrivate = true, handler }: ConfigType) {
  return async (req: NextApiRequest, res: NextApiResponse): Promise<any> => {
    if (req.method && !methods.includes(req.method as any)) {
      return res.status(405).json({
        ok: false,
        error: 'Method not allowed',
      })
    }
    if (isPrivate && !req.session.user) {
      return res.status(401).json({ ok: false, error: 'Plz log in.' })
    }
    try {
      return await handler(req, res)
    } catch (error) {
      return res.status(500).json({ ok: false, error })
    }
  }
}
