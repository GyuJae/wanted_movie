import React from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { useInfiniteBookmarked } from '@hooks/bookmark'

const NextPageBtn = dynamic(() => import('@components/Discovery/NextPageBtn'), { ssr: false })
const BookmarkedList = dynamic(() => import('./BookmarkedList'), { ssr: false })

const styles = {
  container: 'grid grid-cols-2 gap-4 justify-center py-4 sm:grid-cols-3  md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6',
}

const BookmarkedPage = () => {
  const { data, fetchNextPage, isFetching, hasNextPage } = useInfiniteBookmarked()
  const handleFetch = () => {
    if (isFetching) return
    fetchNextPage()
  }
  if (!data) return null
  return (
    <div>
      <motion.div layout className={styles.container}>
        {data.pages.map((page, index) => {
          const key = `bookmakred-view-${page.page}-${index}`
          return <BookmarkedList key={key} data={page} />
        })}
      </motion.div>
      <NextPageBtn handleFetch={handleFetch} isFetching={isFetching} hasNextPage={hasNextPage} />
    </div>
  )
}

export default BookmarkedPage
