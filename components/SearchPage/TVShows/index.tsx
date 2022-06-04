import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { useInfiniteSearchTVs } from '@hooks/tv'
import { useRouter } from 'next/router'

const NextPageBtn = dynamic(() => import('@components/Discovery/NextPageBtn'))
const TVPage = dynamic(() => import('@components/Discovery/TVShows/TVList/TVPage'))
const Loading = dynamic(() => import('@components/Discovery/Skeleton'))

interface IProps {
  inView: boolean
}

const styles = {
  wrapper: 'flex flex-col',
  container:
    'grid grid-cols-2 gap-4 justify-center py-4 pb-10 sm:grid-cols-3  md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6',
}

const TVShows = ({ inView }: IProps) => {
  const {
    query: { query },
  } = useRouter()
  const { data, fetchNextPage, isFetching, hasNextPage } = useInfiniteSearchTVs(query as string)
  const handleFetch = () => {
    if (isFetching) return
    fetchNextPage()
  }
  if (!inView || !data || !query) return null
  return (
    <div className={styles.wrapper}>
      <motion.div layout className={styles.container}>
        <Suspense fallback={<Loading />}>
          {data.pages.map((page, index) => {
            const key = `tv-${query}-${page.page}-${index}`
            return <TVPage key={key} tvPage={page} />
          })}
        </Suspense>
      </motion.div>
      <NextPageBtn handleFetch={handleFetch} isFetching={isFetching} hasNextPage={hasNextPage} />
    </div>
  )
}

export default TVShows
