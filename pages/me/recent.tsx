import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

const RecentView = dynamic(() => import('@components/RecentView'), { ssr: false })

const Recent: NextPage = () => {
  return <RecentView />
}

export default Recent
