import { IMovie } from 'types/movie'
import { INIT_LOADING_TIME } from 'constant'
import dynamic from 'next/dynamic'
import { getLeftDragConstraints } from '@utils/getLeftDragConstraints'
import { timeTrendingState } from '@atoms/timeTrendingState'
import { useRecoilValue } from 'recoil'
import { useTrendings } from '@hooks/trending'

import { useEffect, useState } from 'react'

const Carousel = dynamic(() => import('@components/Carousel'), { ssr: false })
const Skeleton = dynamic(() => import('@components/Home/Skeleton'), { ssr: false })
const DayList = dynamic(() => import('./DayList'), { ssr: false })
const WeekList = dynamic(() => import('./WeekList'), { ssr: false })

interface IProps {
  inView: boolean
}

const Movies = ({ inView }: IProps) => {
  const [init, setInit] = useState<boolean>(true)
  const timeTrending = useRecoilValue(timeTrendingState)
  const { data: dayData, isLoading: dayIsLoading } = useTrendings('movie', 'day')
  const { data: weekData, isLoading: weekIsLoading } = useTrendings('movie', 'week')

  useEffect(() => {
    setTimeout(() => setInit(false), INIT_LOADING_TIME)
  }, [])

  if (!inView || !dayData || !weekData) return null
  const dayMovies = dayData.results as IMovie[]
  const weekMovies = weekData.results as IMovie[]
  const count =
    timeTrending === 'day'
      ? dayMovies.filter((movie) => !!movie.backdrop_path).length
      : weekMovies.filter((movie) => !!movie.backdrop_path).length
  return (
    <>
      <Skeleton
        inView={init || dayIsLoading || weekIsLoading}
        category={`${timeTrending}-loading-trending-movie`}
        size='large'
      />
      <Carousel totalWidth={getLeftDragConstraints({ count, type: 'large' })}>
        <DayList movies={dayData.results as IMovie[]} inView={timeTrending === 'day' && !init && !dayIsLoading} />
        <WeekList movies={dayData.results as IMovie[]} inView={timeTrending === 'week' && !init && !weekIsLoading} />
      </Carousel>
    </>
  )
}

export default Movies
