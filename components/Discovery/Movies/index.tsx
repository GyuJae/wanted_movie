import CategoryTitle from '@components/CategoryTitle'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { movieCategoryDict } from 'dictionary/discoveryCategory'
import { movieDiscoveryState } from 'atoms/discoveryState'
import { showNavState } from 'atoms/showNavState'
import { useRecoilValue } from 'recoil'

const MovieGenres = dynamic(() => import('../MovieGenres'))
const MovieList = dynamic(() => import('./MovieList'))

interface IProps {
  inView: boolean
}

const Movies = ({ inView }: IProps) => {
  const movieCategoryName = useRecoilValue(movieDiscoveryState)
  const showNavValue = useRecoilValue(showNavState)
  if (!inView) return null
  return (
    <div className='px-4 pb-10'>
      <CategoryTitle cateogoryName={movieCategoryDict[movieCategoryName]} />
      <motion.div
        animate={{
          right: showNavValue ? 60 : 90,
        }}
        transition={{
          duration: 0.3,
        }}
        className='absolute -top-1 right-14 z-20'
      >
        <MovieGenres />
      </motion.div>
      <MovieList />
    </div>
  )
}

export default Movies
