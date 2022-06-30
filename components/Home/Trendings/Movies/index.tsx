import { IMovie } from 'types/movie'
import { ITrendingResponse } from 'types/trending'
import dynamic from 'next/dynamic'
import { getLeftDragConstraints } from '@utils/getLeftDragConstraints'
import { timeTrendingState } from '@atoms/timeTrendingState'
import { useRecoilValue } from 'recoil'

const Carousel = dynamic(() => import('@components/Carousel'), { ssr: false })
const DayList = dynamic(() => import('./DayList'), { ssr: false })
const WeekList = dynamic(() => import('./WeekList'), { ssr: false })

interface IProps {
  inView: boolean
  dayMovies: ITrendingResponse
  weekMovies: ITrendingResponse
}

const Movies = ({ inView, dayMovies, weekMovies }: IProps) => {
  const timeTrending = useRecoilValue(timeTrendingState)

  if (!inView) return null

  const dayMoviesResults = dayMovies.results as IMovie[]
  const weekMoviesResults = weekMovies.results as IMovie[]
  const count =
    timeTrending === 'day'
      ? dayMoviesResults.filter((movie) => !!movie.backdrop_path).length
      : weekMoviesResults.filter((movie) => !!movie.backdrop_path).length
  return (
    <Carousel totalWidth={getLeftDragConstraints({ count, type: 'large' })}>
      <DayList movies={dayMovies.results as IMovie[]} inView={timeTrending === 'day'} />
      <WeekList movies={weekMovies.results as IMovie[]} inView={timeTrending === 'week'} />
    </Carousel>
  )
}

export default Movies
