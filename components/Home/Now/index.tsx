import { INIT_LOADING_TIME } from '../constant'
import dynamic from 'next/dynamic'
import { mediaTypeState } from 'atoms/mediaTypeState'
import { useMovies } from '@hooks/movie'
import { useRecoilValue } from 'recoil'
import { useTvs } from '@hooks/tv'

import { useEffect, useState } from 'react'

const Movies = dynamic(() => import('@components/Home/Current/Movies'), { ssr: false })
const TVShows = dynamic(() => import('@components/Home/Current/TVShows'), { ssr: false })
const Skeleton = dynamic(() => import('../Skeleton'), { ssr: false })
const SeeMoreBtn = dynamic(() => import('@components/SeeMoreBtn'), { ssr: false })
const CategoryTitle = dynamic(() => import('@components/CategoryTitle'), { ssr: false })

const Current = () => {
  const mediaType = useRecoilValue(mediaTypeState)
  const { data: movieData, isLoading: movieIsLoading } = useMovies('now_playing')
  const { data: tvData, isLoading: tvIsLoading } = useTvs('on_the_air')
  const [init, setInit] = useState<boolean>(true)

  useEffect(() => {
    setTimeout(() => setInit(false), INIT_LOADING_TIME)
  }, [])

  return (
    <div className='space-y-4'>
      <CategoryTitle cateogoryName={mediaType === 'movie' ? 'Now Playing' : 'On The Air'} />
      <Skeleton category={`now-${mediaType}`} inView={movieIsLoading || tvIsLoading || init} size='medium' />
      <Movies inView={mediaType === 'movie' && !init} data={movieData} />
      <TVShows inView={mediaType === 'tv' && !init} data={tvData} />

      <SeeMoreBtn
        category={mediaType === 'movie' ? 'now_playing' : 'on_the_air'}
        mediaType={mediaType}
        inView={!movieIsLoading && !tvIsLoading && !init}
      />
    </div>
  )
}

export default Current
