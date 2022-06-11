import { IMovieResult } from 'types/movie'
import { ITVResult } from 'types/tv'
import dynamic from 'next/dynamic'
import { mediaTypeState } from 'atoms/mediaTypeState'
import { useRecoilValue } from 'recoil'

const Movies = dynamic(() => import('./Movies'), { ssr: false })
const StarIcon = dynamic(() => import('@components/Icons/StarIcon'), { ssr: false })
const TVShows = dynamic(() => import('./TVShows'), { ssr: false })
const SeeMoreBtn = dynamic(() => import('@components/SeeMoreBtn'), { ssr: false })
const CategoryTitle = dynamic(() => import('@components/CategoryTitle'), { ssr: false })

interface IProps {
  movies: IMovieResult
  tvs: ITVResult
}

const styles = {
  wrapper: 'space-y-4',
  categoryContainer: 'flex items-center space-x-2',
  starIcon: 'fill-yellow-500 w-4 h-4 mt-[2px]',
}

const TopRated = ({ movies, tvs }: IProps) => {
  const mediaType = useRecoilValue(mediaTypeState)

  return (
    <div className={styles.wrapper}>
      <div className={styles.categoryContainer}>
        <CategoryTitle cateogoryName='Top Rated' />
        <StarIcon styleClassName={styles.starIcon} />
      </div>
      <Movies inView={mediaType === 'movie'} data={movies} />
      <TVShows inView={mediaType === 'tv'} data={tvs} />
      <SeeMoreBtn category='top_rated' mediaType='movie' inView />
    </div>
  )
}

export default TopRated
