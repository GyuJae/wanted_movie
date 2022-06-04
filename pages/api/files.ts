import { withApiSession } from '@libs/withSession'

import { NextApiRequest, NextApiResponse } from 'next'
import withHandler, { IResponse } from '@libs/withHandler'

export interface IFilesResponse extends IResponse {
  url?: string
}

async function handler(req: NextApiRequest, res: NextApiResponse<IFilesResponse>) {
  try {
    const response = await (
      await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ACCOUNT_ID}/images/v2/direct_upload`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.CF_API_TOKEN}`,
          },
        }
      )
    ).json()
    return res.status(200).json({
      ok: true,
      ...response.result,
    })
  } catch (error) {
    return res.status(400).json({
      ok: false,
      error: `Error Occured ${error}`,
    })
  }
}

export default withApiSession(withHandler({ methods: ['GET'], handler }))
