import { IMovie } from 'types/movie'
import { ITV } from 'types/tv'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { mediaTypeState } from 'atoms/mediaTypeState'
import { timeTrendingState } from 'atoms/timeTrendingState'
import { useRecoilValue } from 'recoil'
import { useTrendings } from '@hooks/trending'

const Skeleton = dynamic(() => import('@components/Home/Skeleton'), { ssr: false })
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
  const timeTrending = useRecoilValue(timeTrendingState)
  const { data } = useTrendings(mediaType, timeTrending)

  return (
    <div className={styles.wrapper}>
      <div className={styles.categoryContainer}>
        <CategoryTitle cateogoryName='Trending' />
        <TimeToggle />
      </div>
      <Suspense fallback={<Skeleton />}>
        <Movies inView={Boolean(mediaType === 'movie' && data && data.results)} movies={data?.results as IMovie[]} />
        <TVShows inView={Boolean(mediaType === 'tv' && data && data.results)} tvs={data?.results as ITV[]} />
      </Suspense>
    </div>
  )
}

export default Trendings
