import dynamic from 'next/dynamic'
import { mediaTypeState } from 'atoms/mediaTypeState'
import { useMovies } from '@hooks/movie'
import { useRecoilValue } from 'recoil'
import { useTvs } from '@hooks/tv'

import React, { Suspense } from 'react'

const Skeleton = dynamic(() => import('@components/Home/Skeleton'), { ssr: false })
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
  const { data: movieData } = useMovies('top_rated')
  const { data: tvData } = useTvs('top_rated')

  return (
    <div className={styles.wrapper}>
      <div className={styles.categoryContainer}>
        <CategoryTitle cateogoryName='Top Rated' />
        <StarIcon styleClassName={styles.starIcon} />
      </div>
      <Suspense fallback={<Skeleton />}>
        <Movies inView={mediaType === 'movie'} data={movieData} />
        <TVShows inView={mediaType === 'tv'} data={tvData} />
      </Suspense>
      <SeeMoreBtn category='top_rated' mediaType='movie' />
    </div>
  )
}

export default TopRated
