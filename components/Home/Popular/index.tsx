import dynamic from 'next/dynamic'
import { mediaTypeState } from 'atoms/mediaTypeState'
import { useRecoilValue } from 'recoil'

import React, { Suspense } from 'react'

const Skeleton = dynamic(() => import('@components/Skeleton'))
const Movies = dynamic(() => import('./Movies'))
const TVShows = dynamic(() => import('./TVShows'))

const Popular = () => {
  const mediaType = useRecoilValue(mediaTypeState)

  return (
    <div className='space-y-4'>
      <div className='flex items-center'>
        <div className='flex items-center space-x-2'>
          <h3 className='text-xl font-semibold'>Popular</h3>
        </div>
      </div>
      <Suspense fallback={<Skeleton />}>
        <Movies inView={mediaType === 'movie'} />
        <TVShows inView={mediaType === 'tv'} />
      </Suspense>
    </div>
  )
}

export default Popular
