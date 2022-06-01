import dynamic from 'next/dynamic'
import { mediaTypeState } from 'atoms/mediaTypeState'
import { useRecoilValue } from 'recoil'

import React, { Suspense } from 'react'

const Skeleton = dynamic(() => import('@components/Home/Skeleton'))
const Movies = dynamic(() => import('./Movies'))
const TVShows = dynamic(() => import('./TVShows'))
const SeeMoreBtn = dynamic(() => import('@components/SeeMoreBtn'))
const CategoryTitle = dynamic(() => import('@components/CategoryTitle'))

const Popular = () => {
  const mediaType = useRecoilValue(mediaTypeState)

  return (
    <div className='space-y-4'>
      <CategoryTitle cateogoryName='Popular' />
      <Suspense fallback={<Skeleton />}>
        <Movies inView={mediaType === 'movie'} />
        <TVShows inView={mediaType === 'tv'} />
      </Suspense>
      <SeeMoreBtn category='popular' mediaType='movie' />
    </div>
  )
}

export default Popular
