import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { mediaTypeState } from 'atoms/mediaTypeState'
import { useMovies } from '@hooks/movie'
import { useRecoilValue } from 'recoil'
import { useTvs } from '@hooks/tv'

const Movies = dynamic(() => import('@components/Home/Current/Movies'))
const TVShows = dynamic(() => import('@components/Home/Current/TVShows'))
const Skeleton = dynamic(() => import('@components/Home/Skeleton'))
const SeeMoreBtn = dynamic(() => import('@components/SeeMoreBtn'))
const CategoryTitle = dynamic(() => import('@components/CategoryTitle'))

const Current = () => {
  const mediaType = useRecoilValue(mediaTypeState)
  const { data: movieData } = useMovies('now_playing')
  const { data: tvData } = useTvs('on_the_air')

  return (
    <div className='space-y-4'>
      <CategoryTitle cateogoryName={mediaType === 'movie' ? 'Now Playing' : 'On The Air'} />
      <Suspense fallback={<Skeleton />}>
        <Movies inView={mediaType === 'movie'} data={movieData} />
        <TVShows inView={mediaType === 'tv'} data={tvData} />
      </Suspense>
      <SeeMoreBtn category={mediaType === 'movie' ? 'now_playing' : 'on_the_air'} mediaType={mediaType} />
    </div>
  )
}

export default Current
