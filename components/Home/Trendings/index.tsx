import { ITrendingResponse } from 'types/trending'
import dynamic from 'next/dynamic'
import { mediaTypeState } from 'atoms/mediaTypeState'
import { useRecoilValue } from 'recoil'

const Movies = dynamic(() => import('./Movies'), { ssr: false })
const TVShows = dynamic(() => import('./TVShows'), { ssr: false })
const TimeToggle = dynamic(() => import('./TimeToggle'), { ssr: false })
const CategoryTitle = dynamic(() => import('@components/CategoryTitle'), { ssr: false })

interface IProps {
  dayMovies: ITrendingResponse
  weekMovies: ITrendingResponse
  dayTVs: ITrendingResponse
  weekTVs: ITrendingResponse
}

const styles = {
  wrapper: 'space-y-4',
  categoryContainer: 'flex items-center space-x-4',
}

const Trendings = ({ dayMovies, weekMovies, dayTVs, weekTVs }: IProps) => {
  const mediaType = useRecoilValue(mediaTypeState)

  return (
    <div className={styles.wrapper}>
      <div className={styles.categoryContainer}>
        <CategoryTitle cateogoryName='Trending' />
        <TimeToggle />
      </div>
      <Movies inView={mediaType === 'movie'} dayMovies={dayMovies} weekMovies={weekMovies} />
      <TVShows inView={mediaType === 'tv'} dayTVs={dayTVs} weekTVs={weekTVs} />
    </div>
  )
}

export default Trendings
