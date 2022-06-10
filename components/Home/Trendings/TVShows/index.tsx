import { INIT_LOADING_TIME } from 'constant'
import { ITV } from 'types/tv'
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

const TVShows = ({ inView }: IProps) => {
  const timeTrending = useRecoilValue(timeTrendingState)
  const [init, setInit] = useState<boolean>(true)
  const { data: dayData, isLoading: dayIsLoading } = useTrendings('tv', 'day')
  const { data: weekData, isLoading: weekIsLoading } = useTrendings('tv', 'week')

  useEffect(() => {
    setTimeout(() => setInit(false), INIT_LOADING_TIME)
  }, [])

  if (!inView || !dayData || !weekData) return null
  const dayTVs = dayData.results as ITV[]
  const weekTVs = weekData.results as ITV[]
  const count =
    timeTrending === 'day'
      ? dayTVs.filter((tv) => !!tv.backdrop_path).length
      : weekTVs.filter((tv) => !!tv.backdrop_path).length
  return (
    <>
      <Skeleton
        inView={init || dayIsLoading || weekIsLoading}
        size='large'
        category={`trending-loading-tv-${timeTrending}`}
      />
      <Carousel totalWidth={getLeftDragConstraints({ count, type: 'large' })}>
        <DayList tvs={dayData.results as ITV[]} inView={timeTrending === 'day' && !init && !dayIsLoading} />
        <WeekList tvs={weekData.results as ITV[]} inView={timeTrending === 'week' && !init && !weekIsLoading} />
      </Carousel>
    </>
  )
}

export default TVShows
