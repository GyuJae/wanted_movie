import React from 'react'
import dynamic from 'next/dynamic'
import { mediaTypeState } from 'atoms/mediaTypeState'
import { useRecoilValue } from 'recoil'

const Movies = dynamic(() => import('./Movies'))
const StarIcon = dynamic(() => import('@components/Icons/StarIcon'))
const TVShows = dynamic(() => import('./TVShows'))

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
      <Movies inView={mediaType === 'movie'} />
      <TVShows inView={mediaType === 'tv'} />
    </div>
  )
}

export default TopRated
