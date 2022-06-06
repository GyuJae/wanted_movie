import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { movieDiscoveryState } from 'atoms/discoveryState'
import { useInfiniteMovies } from '@hooks/movie'
import { useRecoilValue } from 'recoil'

const MoviePage = dynamic(() => import('./MoviePage'), { ssr: false })
const NextPageBtn = dynamic(() => import('@components/Discovery/NextPageBtn'), { ssr: false })

const styles = {
  wrapper: 'flex flex-col',
  container:
    'grid grid-cols-2 gap-4 justify-center py-4 pb-10 sm:grid-cols-3  md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6',
}

const MovieList = () => {
  const cateogry = useRecoilValue(movieDiscoveryState)

  const { data, fetchNextPage, isFetching, hasNextPage } = useInfiniteMovies(cateogry)
  const handleFetch = () => {
    if (isFetching) return
    fetchNextPage()
  }

  if (!data) return null
  return (
    <div className={styles.wrapper}>
      <motion.ul layout className={styles.container}>
        {data.pages.map((page, index) => {
          const key = `movie-${cateogry}-${page.page}-${index}`
          return <MoviePage key={key} moviePage={page} />
        })}
      </motion.ul>
      <NextPageBtn handleFetch={handleFetch} isFetching={isFetching} hasNextPage={hasNextPage} />
    </div>
  )
}

export default MovieList
