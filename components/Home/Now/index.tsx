import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { mediaTypeState } from 'atoms/mediaTypeState'
import { useRecoilValue } from 'recoil'

const Movies = dynamic(() => import('./Movies'))
const TVShows = dynamic(() => import('./TVShows'))
const Skeleton = dynamic(() => import('@components/Skeleton'))
const SeeMoreBtn = dynamic(() => import('@components/SeeMoreBtn'))

const Current = () => {
  const mediaType = useRecoilValue(mediaTypeState)

  return (
    <div className='space-y-4'>
      <div className='flex items-center'>
        <h3 className='text-xl font-semibold'>{mediaType === 'movie' ? 'Now Playing' : 'On The Air'}</h3>
      </div>
      <Suspense fallback={<Skeleton />}>
        <Movies inView={mediaType === 'movie'} />
        <TVShows inView={mediaType === 'tv'} />
      </Suspense>
      <SeeMoreBtn category='now_playing' mediaType='movie' />
    </div>
  )
}

export default Current
