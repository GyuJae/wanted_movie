import { IMovieResult } from 'types/movie'
import { ITVResult } from 'types/tv'
import dynamic from 'next/dynamic'
import { mediaTypeState } from 'atoms/mediaTypeState'
import { useRecoilValue } from 'recoil'

const Movies = dynamic(() => import('@components/Home/TopRated/Movies'), { ssr: false })
const TVShows = dynamic(() => import('@components/Home/TopRated/TVShows'), { ssr: false })
const SeeMoreBtn = dynamic(() => import('@components/SeeMoreBtn'), { ssr: false })
const CategoryTitle = dynamic(() => import('@components/CategoryTitle'), { ssr: false })

interface IProps {
  movies: IMovieResult
  tvs: ITVResult
}

const Popular = ({ movies, tvs }: IProps) => {
  const mediaType = useRecoilValue(mediaTypeState)

  return (
    <div className='space-y-4'>
      <CategoryTitle cateogoryName='Popular' />
      <Movies inView={mediaType === 'movie'} showStar={false} data={movies} />
      <TVShows inView={mediaType === 'tv'} showStar={false} data={tvs} />
      <SeeMoreBtn category='popular' mediaType='movie' inView />
    </div>
  )
}

export default Popular
