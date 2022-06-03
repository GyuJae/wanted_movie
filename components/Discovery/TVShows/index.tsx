import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { showNavState } from 'atoms/showNavState'
import { tvCategoryDict } from 'dictionary/discoveryCategory'
import { tvDiscoveryState } from 'atoms/discoveryState'
import { useRecoilValue } from 'recoil'

const TVShowGenres = dynamic(() => import('./TVShowGenres'))
const TVList = dynamic(() => import('./TVList'))
const CategoryTitle = dynamic(() => import('@components/CategoryTitle'))

interface IProps {
  inView: boolean
}

const Movies = ({ inView }: IProps) => {
  const tvCategoryname = useRecoilValue(tvDiscoveryState)
  const showNavValue = useRecoilValue(showNavState)
  if (!inView) return null
  return (
    <div className='px-4 pb-10'>
      <div className='flex justify-between'>
        <CategoryTitle cateogoryName={tvCategoryDict[tvCategoryname]} />
        <motion.div
          animate={{
            right: showNavValue ? 60 : 90,
          }}
          transition={{
            duration: 0.3,
          }}
          className='z-10'
        >
          <TVShowGenres />
        </motion.div>
      </div>
      <TVList />
    </div>
  )
}

export default Movies
