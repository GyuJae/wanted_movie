import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { mediaTypeState } from 'atoms/mediaTypeState'
import { useMovies } from '@hooks/movie'
import { useRecoilValue } from 'recoil'
import { useTvs } from '@hooks/tv'

const Movies = dynamic(() => import('@components/Home/Current/Movies'), { ssr: false })
const TVShows = dynamic(() => import('@components/Home/Current/TVShows'), { ssr: false })
const Skeleton = dynamic(() => import('@components/Home/Skeleton'), { ssr: false })
const SeeMoreBtn = dynamic(() => import('@components/SeeMoreBtn'), { ssr: false })
const CategoryTitle = dynamic(() => import('@components/CategoryTitle'), { ssr: false })

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
