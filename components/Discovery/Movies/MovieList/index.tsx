import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { movieDiscoveryState } from 'atoms/discoveryState'
import { useInfiniteMovies } from '@hooks/movie'
import { useRecoilValue } from 'recoil'

const MoviePage = dynamic(() => import('./MoviePage'))
const NextPageBtn = dynamic(() => import('./NextPageBtn'))

const MovieList = () => {
  const cateogry = useRecoilValue(movieDiscoveryState)

  const { data, fetchNextPage, isFetching, hasNextPage } = useInfiniteMovies(cateogry)
  const handleFetch = () => {
    if (isFetching) return
    fetchNextPage()
  }

  if (!data) return null
  return (
    <div className='flex flex-col'>
      <motion.div
        layout
        className='grid grid-cols-2 gap-x-20 gap-y-12 py-4 pb-10 w-11/12 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'
      >
        {data.pages.map((page, index) => {
          const key = `movie-${cateogry}-${page.page}-${index}`
          return <MoviePage key={key} moviePage={page} />
        })}
      </motion.div>
      <NextPageBtn handleFetch={handleFetch} isFetching={isFetching} hasNextPage={hasNextPage} />
    </div>
  )
}

export default MovieList
