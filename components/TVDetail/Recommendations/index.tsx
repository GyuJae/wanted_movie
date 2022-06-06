import Carousel from '@components/Carousel'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { getLeftDragConstraints } from '@utils/getLeftDragConstraints'
import { useTVRecommendations } from '@hooks/tv'

const RecommendationsItem = dynamic(() => import('./RecommendationsItem'), { ssr: false })
const Skeleton = dynamic(() => import('@components/Home/Skeleton'), { ssr: false })
const CategoryTitle = dynamic(() => import('@components/CategoryTitle'), { ssr: false })

interface IProps {
  id: string
}

const Recommendations = ({ id }: IProps) => {
  const { data } = useTVRecommendations(id)
  if (!data || data.results.length === 0) return null

  const count = data.results.filter((tv) => !!tv.backdrop_path).length
  return (
    <div className='overflow-hidden space-y-4'>
      <CategoryTitle cateogoryName='Recommendations' />
      <Suspense fallback={<Skeleton />}>
        <Carousel totalWidth={getLeftDragConstraints({ count, type: 'medium' })}>
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
