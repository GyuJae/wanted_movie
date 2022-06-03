import dynamic from 'next/dynamic'
import { useRecentViews } from '@hooks/recentView'

const RecentItem = dynamic(() => import('./RecentItem'))

const RecentList = () => {
  const { data } = useRecentViews()
  if (!data || !data.ok || !data.recentViews) return null
  return (
    <div className='grid grid-cols-2 gap-4 justify-center py-4 sm:grid-cols-3  md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
      {data.recentViews.map((recentView, index) => {
        const key = `${recentView.id}-${index}`
        return <RecentItem key={key} recentView={recentView} />
      })}
    </div>
  )
}

export default RecentList
