import { IMovie } from 'types/movie'
import { INIT_LOADING_TIME } from '../constant'
import { ITV } from 'types/tv'
import Skeleton from '../Skeleton'
import dynamic from 'next/dynamic'
import { mediaTypeState } from 'atoms/mediaTypeState'
import { timeTrendingState } from 'atoms/timeTrendingState'
import { useRecoilValue } from 'recoil'
import { useTrendings } from '@hooks/trending'

import { useEffect, useState } from 'react'

const Movies = dynamic(() => import('./Movies'), { ssr: false })
const TVShows = dynamic(() => import('./TVShows'), { ssr: false })
const TimeToggle = dynamic(() => import('./TimeToggle'), { ssr: false })
const CategoryTitle = dynamic(() => import('@components/CategoryTitle'), { ssr: false })

const styles = {
  wrapper: 'space-y-4',
  categoryContainer: 'flex items-center space-x-4',
}

const Trendings = () => {
  const [init, setInit] = useState<boolean>(true)
  const mediaType = useRecoilValue(mediaTypeState)
  const timeTrending = useRecoilValue(timeTrendingState)
  const { data, isLoading } = useTrendings(mediaType, timeTrending)

  useEffect(() => {
    setTimeout(() => setInit(false), INIT_LOADING_TIME)
  }, [])

  return (
    <div className={styles.wrapper}>
      <div className={styles.categoryContainer}>
        <CategoryTitle cateogoryName='Trending' />
        <TimeToggle />
      </div>
      <Skeleton inView={isLoading || init} size='large' category={`trending-${mediaType}`} />
      <Movies
        inView={Boolean(mediaType === 'movie' && data && data.results && !isLoading && !init)}
        movies={data?.results as IMovie[]}
      />
      <TVShows
        inView={Boolean(mediaType === 'tv' && data && data.results && !isLoading && !init)}
        tvs={data?.results as ITV[]}
      />
    </div>
  )
}

export default Trendings
