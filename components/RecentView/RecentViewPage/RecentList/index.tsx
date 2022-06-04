import { AnimatePresence } from 'framer-motion'
import { IRecentViewResponse } from 'types/recent'
import dynamic from 'next/dynamic'

const RecentItem = dynamic(() => import('./RecentItem'))

interface IProps {
  data?: IRecentViewResponse
}

const RecentList = ({ data }: IProps) => {
  if (!data || !data.ok || !data.recentViews) return null
  return (
    <AnimatePresence>
      {data.recentViews.map((recentView, index) => {
        const key = `${recentView.id}-${index}`
        return <RecentItem key={key} recentView={recentView} />
      })}
    </AnimatePresence>
  )
}

export default RecentList
