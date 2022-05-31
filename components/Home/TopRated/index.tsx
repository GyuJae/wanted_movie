import dynamic from 'next/dynamic'
import { mediaTypeState } from 'atoms/mediaTypeState'
import { useRecoilValue } from 'recoil'

import React, { Suspense } from 'react'

const Skeleton = dynamic(() => import('@components/Skeleton'))
const Movies = dynamic(() => import('./Movies'))
const StarIcon = dynamic(() => import('@components/Icons/StarIcon'))
const TVShows = dynamic(() => import('./TVShows'))
const SeeMoreBtn = dynamic(() => import('@components/SeeMoreBtn'))

const TopRated = () => {
  const mediaType = useRecoilValue(mediaTypeState)

  return (
    <div className='space-y-4'>
      <div className='flex items-center'>
        <div className='flex items-center space-x-2'>
          <h3 className='text-xl font-semibold'>Top Rated</h3>
          <StarIcon styleClassName='fill-yellow-500 w-4 h-4 mt-[2px]' />
        </div>
      </div>
      <Suspense fallback={<Skeleton />}>
        <Movies inView={mediaType === 'movie'} />
        <TVShows inView={mediaType === 'tv'} />
      </Suspense>
      <SeeMoreBtn category='top_rated' mediaType='movie' />
    </div>
  )
}

export default TopRated
