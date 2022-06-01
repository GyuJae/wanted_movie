import Carousel from '@components/Carousel'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { useTVRecommendations } from '@hooks/tv'

const RecommendationsItem = dynamic(() => import('./RecommendationsItem'))
const Skeleton = dynamic(() => import('@components/Home/Skeleton'))

interface IProps {
  id: string
}

const Recommendations = ({ id }: IProps) => {
  const { data } = useTVRecommendations(id)
  if (!data || data.results.length === 0) return null
  return (
    <div className='space-y-4'>
      <div className='flex items-center'>
        <div className='flex items-center space-x-2'>
          <h3 className='text-xl font-semibold'>Recommendations</h3>
        </div>
      </div>
      <Suspense fallback={<Skeleton />}>
        <Carousel totalWidth={data.results.filter((tv) => !!tv.backdrop_path).length * 255}>
          {data?.results.map((tv, index) => {
            const key = `recommendation-${tv.id}-${index}`
            return <RecommendationsItem key={key} tv={tv} />
          })}
        </Carousel>
      </Suspense>
    </div>
  )
}

export default Recommendations
