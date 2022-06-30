import { IMovieResult } from 'types/movie'
import { ITVResult } from 'types/tv'
import dynamic from 'next/dynamic'
import { mediaTypeState } from 'atoms/mediaTypeState'
import { useRecoilValue } from 'recoil'

const Movies = dynamic(() => import('routes/Home/Current/Movies'), { ssr: false })
const TVShows = dynamic(() => import('routes/Home/Current/TVShows'), { ssr: false })
const SeeMoreBtn = dynamic(() => import('@components/SeeMoreBtn'), { ssr: false })
const CategoryTitle = dynamic(() => import('@components/CategoryTitle'), { ssr: false })

interface IProps {
  movies: IMovieResult
  tvs: ITVResult
}

const Current = ({ movies, tvs }: IProps) => {
  const mediaType = useRecoilValue(mediaTypeState)

  return (
    <div className='space-y-4'>
      <CategoryTitle cateogoryName={mediaType === 'movie' ? 'Now Playing' : 'On The Air'} />
      <Movies inView={mediaType === 'movie'} data={movies} />
      <TVShows inView={mediaType === 'tv'} data={tvs} />

      <SeeMoreBtn category={mediaType === 'movie' ? 'now_playing' : 'on_the_air'} mediaType={mediaType} inView />
    </div>
  )
}

export default Current
