import { IMovie } from 'types/movie'
import { ITV } from 'types/tv'
import dynamic from 'next/dynamic'
import { mediaTypeState } from 'atoms/mediaTypeState'
import { timeTrendingState } from 'atoms/timeTrendingState'
import { useRecoilValue } from 'recoil'
import { useTrendings } from '@hooks/trending'

const Movies = dynamic(() => import('./Movies'))
const TVShows = dynamic(() => import('./TVShows'))
const TimeToggle = dynamic(() => import('./TimeToggle'))

const Trendings = () => {
  const mediaType = useRecoilValue(mediaTypeState)
  const timeTrending = useRecoilValue(timeTrendingState)
  const { data } = useTrendings(mediaType, timeTrending)

  return (
    <div className='space-y-4 '>
      <div className='flex items-center space-x-4'>
        <h3 className='text-xl font-semibold'>Trending</h3>
        <TimeToggle />
      </div>
      <Movies inView={Boolean(mediaType === 'movie' && data && data.results)} movies={data?.results as IMovie[]} />
      <TVShows inView={Boolean(mediaType === 'tv' && data && data.results)} tvs={data?.results as ITV[]} />
    </div>
  )
}

export default Trendings
