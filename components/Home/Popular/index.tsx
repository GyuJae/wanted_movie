import dynamic from 'next/dynamic'
import { mediaTypeState } from 'atoms/mediaTypeState'
import { useMovies } from '@hooks/movie'
import { useRecoilValue } from 'recoil'
import { useTvs } from '@hooks/tv'

import React, { Suspense } from 'react'

const Skeleton = dynamic(() => import('@components/Home/Skeleton'))
const Movies = dynamic(() => import('@components/Home/TopRated/Movies'))
const TVShows = dynamic(() => import('@components/Home/TopRated/TVShows'))
const SeeMoreBtn = dynamic(() => import('@components/SeeMoreBtn'))
const CategoryTitle = dynamic(() => import('@components/CategoryTitle'))

const Popular = () => {
  const mediaType = useRecoilValue(mediaTypeState)
  const { data: movieData } = useMovies('popular')
  const { data: tvData } = useTvs('popular')

  return (
    <div className='space-y-4'>
      <CategoryTitle cateogoryName='Popular' />
      <Suspense fallback={<Skeleton />}>
        <Movies inView={mediaType === 'movie'} showStar={false} data={movieData} />
        <TVShows inView={mediaType === 'tv'} showStar={false} data={tvData} />
      </Suspense>
      <SeeMoreBtn category='popular' mediaType='movie' />
    </div>
  )
}

export default Popular
