import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { tvDiscoveryState } from 'atoms/discoveryState'
import { useInfiniteTVs } from '@hooks/tv'
import { useRecoilValue } from 'recoil'

const TVPage = dynamic(() => import('./TVPage'))
const NextPageBtn = dynamic(() => import('@components/Discovery//NextPageBtn'))
const Loading = dynamic(() => import('@components/Discovery/Skeleton'))

const TVList = () => {
  const cateogry = useRecoilValue(tvDiscoveryState)

  const { data, fetchNextPage, isFetching, hasNextPage } = useInfiniteTVs(cateogry)
  const handleFetch = () => {
    if (isFetching) return
    fetchNextPage()
  }

  if (!data) return null
  return (
    <div className='flex flex-col'>
      <motion.div
        layout
        className='grid grid-cols-2 gap-4 justify-center py-4 pb-10 sm:grid-cols-3  md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'
      >
        <Suspense fallback={<Loading />}>
          {data.pages.map((page, index) => {
            const key = `movie-${cateogry}-${page.page}-${index}`
            return <TVPage key={key} tvPage={page} />
          })}
        </Suspense>
      </motion.div>
      <NextPageBtn handleFetch={handleFetch} isFetching={isFetching} hasNextPage={hasNextPage} />
    </div>
  )
}

export default TVList
