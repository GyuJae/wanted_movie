import { INIT_LOADING_TIME } from '../constant'
import dynamic from 'next/dynamic'
import { mediaTypeState } from 'atoms/mediaTypeState'
import { useMovies } from '@hooks/movie'
import { useRecoilValue } from 'recoil'
import { useTvs } from '@hooks/tv'

import React, { useEffect, useState } from 'react'

const Skeleton = dynamic(() => import('../Skeleton'), { ssr: false })
const Movies = dynamic(() => import('@components/Home/TopRated/Movies'), { ssr: false })
const TVShows = dynamic(() => import('@components/Home/TopRated/TVShows'), { ssr: false })
const SeeMoreBtn = dynamic(() => import('@components/SeeMoreBtn'), { ssr: false })
const CategoryTitle = dynamic(() => import('@components/CategoryTitle'), { ssr: false })

const Popular = () => {
  const mediaType = useRecoilValue(mediaTypeState)
  const { data: movieData, isLoading: movieIsLoading } = useMovies('popular')
  const { data: tvData, isLoading: tvIsLoading } = useTvs('popular')
  const [init, setInit] = useState<boolean>(true)
  useEffect(() => {
    setTimeout(() => setInit(false), INIT_LOADING_TIME)
  }, [])

  return (
    <div className='space-y-4'>
      <CategoryTitle cateogoryName='Popular' />
      <Skeleton category={`popular-${mediaType}`} size='small' inView={movieIsLoading || tvIsLoading || init} />
      <Movies inView={mediaType === 'movie' && !init} showStar={false} data={movieData} />
      <TVShows inView={mediaType === 'tv' && !init} showStar={false} data={tvData} />
      <SeeMoreBtn category='popular' mediaType='movie' inView={!movieIsLoading && !tvIsLoading && !init} />
    </div>
  )
}

export default Popular
