import { INIT_LOADING_TIME } from '../constant'
import dynamic from 'next/dynamic'
import { mediaTypeState } from 'atoms/mediaTypeState'
import { useMovies } from '@hooks/movie'
import { useRecoilValue } from 'recoil'
import { useTvs } from '@hooks/tv'

import React, { useEffect, useState } from 'react'

const Skeleton = dynamic(() => import('../Skeleton'), { ssr: false })
const Movies = dynamic(() => import('./Movies'), { ssr: false })
const StarIcon = dynamic(() => import('@components/Icons/StarIcon'), { ssr: false })
const TVShows = dynamic(() => import('./TVShows'), { ssr: false })
const SeeMoreBtn = dynamic(() => import('@components/SeeMoreBtn'), { ssr: false })
const CategoryTitle = dynamic(() => import('@components/CategoryTitle'), { ssr: false })

const styles = {
  wrapper: 'space-y-4',
  categoryContainer: 'flex items-center space-x-2',
  starIcon: 'fill-yellow-500 w-4 h-4 mt-[2px]',
}

const TopRated = () => {
  const mediaType = useRecoilValue(mediaTypeState)
  const [init, setInit] = useState<boolean>(true)
  const { data: movieData, isLoading: movieIsLoading } = useMovies('top_rated')
  const { data: tvData, isLoading: tvIsLoading } = useTvs('top_rated')

  useEffect(() => {
    setTimeout(() => setInit(false), INIT_LOADING_TIME)
  }, [])

  return (
    <div className={styles.wrapper}>
      <div className={styles.categoryContainer}>
        <CategoryTitle cateogoryName='Top Rated' />
        <StarIcon styleClassName={styles.starIcon} />
      </div>
      <Skeleton category={`topRated-${mediaType}`} size='small' inView={movieIsLoading || tvIsLoading || init} />
      <Movies inView={mediaType === 'movie' && !init} data={movieData} />
      <TVShows inView={mediaType === 'tv' && !init} data={tvData} />
      <SeeMoreBtn category='top_rated' mediaType='movie' inView={!movieIsLoading && !tvIsLoading && !init} />
    </div>
  )
}

export default TopRated
