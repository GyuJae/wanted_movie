import { ITV } from 'types/tv'
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
  dayTVs: ITrendingResponse
  weekTVs: ITrendingResponse
}

const TVShows = ({ inView, dayTVs, weekTVs }: IProps) => {
  const timeTrending = useRecoilValue(timeTrendingState)

  if (!inView) return null
  const dayTVsResults = dayTVs.results as ITV[]
  const weekTVsResults = weekTVs.results as ITV[]
  const count =
    timeTrending === 'day'
      ? dayTVsResults.filter((tv) => !!tv.backdrop_path).length
      : weekTVsResults.filter((tv) => !!tv.backdrop_path).length
  return (
    <Carousel totalWidth={getLeftDragConstraints({ count, type: 'large' })}>
      <DayList tvs={dayTVs.results as ITV[]} inView={timeTrending === 'day'} />
      <WeekList tvs={weekTVs.results as ITV[]} inView={timeTrending === 'week'} />
    </Carousel>
  )
}

export default TVShows
