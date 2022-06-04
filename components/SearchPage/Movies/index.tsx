import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { useInfiniteSearchMovies } from '@hooks/movie'
import { useRouter } from 'next/router'

import { Suspense, useEffect } from 'react'

const NextPageBtn = dynamic(() => import('@components/Discovery/NextPageBtn'))
const MoviePage = dynamic(() => import('@components/Discovery/Movies/MovieList/MoviePage'))
const Loading = dynamic(() => import('@components/Discovery/Skeleton'))

interface IProps {
  inView: boolean
}

const styles = {
  wrapper: 'flex flex-col',
  container:
    'grid grid-cols-2 gap-4 justify-center py-4 pb-10 sm:grid-cols-3  md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6',
}

const Movies = ({ inView }: IProps) => {
  const {
    query: { query },
  } = useRouter()
  const { data, fetchNextPage, isFetching, hasNextPage, refetch } = useInfiniteSearchMovies(query as string)
  const handleFetch = () => {
    if (isFetching) return
    fetchNextPage()
  }
  useEffect(() => {
    refetch()
  }, [query, refetch])
  if (!inView || !data || !query) return null
  return (
    <div className={styles.wrapper}>
      <motion.div layout className={styles.container}>
        <Suspense fallback={<Loading />}>
          {data.pages.map((page, index) => {
            const key = `movie-${query}-${page.page}-${index}`
            return <MoviePage key={key} moviePage={page} />
          })}
        </Suspense>
      </motion.div>
      <NextPageBtn handleFetch={handleFetch} isFetching={isFetching} hasNextPage={hasNextPage} />
    </div>
  )
}

export default Movies
