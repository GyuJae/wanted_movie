import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { mediaTypeState } from 'atoms/mediaTypeState'
import { useRecoilValue } from 'recoil'

const Movies = dynamic(() => import('./Movies'))
const TVShows = dynamic(() => import('./TVShows'))
const Skeleton = dynamic(() => import('@components/Skeleton'))
const SeeMoreBtn = dynamic(() => import('@components/SeeMoreBtn'))
const CategoryTitle = dynamic(() => import('@components/CategoryTitle'))

const Current = () => {
  const mediaType = useRecoilValue(mediaTypeState)

  return (
    <div className='space-y-4'>
      <CategoryTitle cateogoryName={mediaType === 'movie' ? 'Now Playing' : 'On The Air'} />
      <Suspense fallback={<Skeleton />}>
        <Movies inView={mediaType === 'movie'} />
        <TVShows inView={mediaType === 'tv'} />
      </Suspense>
      <SeeMoreBtn category={mediaType === 'movie' ? 'now_playing' : 'on_the_air'} mediaType={mediaType} />
    </div>
  )
}

export default Current
