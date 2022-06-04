import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { useInfiniteRecentViews } from '@hooks/recentView'

const NextPageBtn = dynamic(() => import('@components/Discovery/NextPageBtn'))
const RecentViewList = dynamic(() => import('./RecentList'))

const styles = {
  container: 'grid grid-cols-2 gap-4 justify-center py-4 sm:grid-cols-3  md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6',
}

const RecentViewPage = () => {
  const { data, fetchNextPage, isFetching, hasNextPage } = useInfiniteRecentViews()
  const handleFetch = () => {
    if (isFetching) return
    fetchNextPage()
  }
  if (!data) return null
  return (
    <div>
      <motion.div layout className={styles.container}>
        {data.pages.map((page, index) => {
          const key = `recent-view-${page.page}-${index}`
          return <RecentViewList key={key} data={page} />
        })}
      </motion.div>
      <NextPageBtn handleFetch={handleFetch} isFetching={isFetching} hasNextPage={hasNextPage} />
    </div>
  )
}

export default RecentViewPage
