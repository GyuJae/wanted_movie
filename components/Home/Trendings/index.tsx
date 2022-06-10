import dynamic from 'next/dynamic'
import { mediaTypeState } from 'atoms/mediaTypeState'
import { useRecoilValue } from 'recoil'

const Movies = dynamic(() => import('./Movies'), { ssr: false })
const TVShows = dynamic(() => import('./TVShows'), { ssr: false })
const TimeToggle = dynamic(() => import('./TimeToggle'), { ssr: false })
const CategoryTitle = dynamic(() => import('@components/CategoryTitle'), { ssr: false })

const styles = {
  wrapper: 'space-y-4',
  categoryContainer: 'flex items-center space-x-4',
}

const Trendings = () => {
  const mediaType = useRecoilValue(mediaTypeState)

  return (
    <div className={styles.wrapper}>
      <div className={styles.categoryContainer}>
        <CategoryTitle cateogoryName='Trending' />
        <TimeToggle />
      </div>
      <Movies inView={mediaType === 'movie'} />
      <TVShows inView={mediaType === 'tv'} />
    </div>
  )
}

export default Trendings
