import Carousel from '@components/Carousel'
import { ITVResult } from 'types/tv'
import dynamic from 'next/dynamic'
import { getLeftDragConstraints } from '@utils/getLeftDragConstraints'

const RecommendationsItem = dynamic(() => import('./RecommendationsItem'), { ssr: false })
const CategoryTitle = dynamic(() => import('@components/CategoryTitle'), { ssr: false })

interface IProps {
  recommendations: ITVResult
}

const Recommendations = ({ recommendations }: IProps) => {
  const count = recommendations.results.filter((tv) => !!tv.backdrop_path).length
  return (
    <div className='overflow-hidden space-y-4'>
      <CategoryTitle cateogoryName='Recommendations' />
      <Carousel totalWidth={getLeftDragConstraints({ count, type: 'medium' })}>
        {recommendations.results.map((tv, index) => {
          const key = `recommendation-${tv.id}-${index}`
          return <RecommendationsItem key={key} tv={tv} />
        })}
      </Carousel>
    </div>
  )
}

export default Recommendations
