import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

const Community = dynamic(() => import('@components/Community'), { ssr: false })

const CommunityPage: NextPage = () => {
  return <Community />
}

export default CommunityPage