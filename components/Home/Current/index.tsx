import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { mediaTypeState } from 'atoms/mediaTypeState'
import { useRecoilValue } from 'recoil'

const Movies = dynamic(() => import('./Movies'))
const TVShows = dynamic(() => import('./TVShows'))
const Skeleton = dynamic(() => import('@components/Skeleton'))

const Popular = () => {
  const mediaType = useRecoilValue(mediaTypeState)

  return (
    <div className='space-y-4'>
      <div className='flex items-center'>
        <h3 className='text-xl font-semibold'>{mediaType === 'movie' ? 'Upcoming' : 'Airing Today'}</h3>
      </div>
      <Suspense fallback={<Skeleton />}>
        <Movies inView={mediaType === 'movie'} />
        <TVShows inView={mediaType === 'tv'} />
      </Suspense>
    </div>
  )
}

export default Popular
