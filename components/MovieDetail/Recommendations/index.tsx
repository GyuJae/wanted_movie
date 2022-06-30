import { IMovieResult } from 'types/movie'
import dynamic from 'next/dynamic'

const RecommendationsItem = dynamic(() => import('@components/Home/Current/Movies'), { ssr: false })
const CategoryTitle = dynamic(() => import('@components/CategoryTitle'), { ssr: false })

interface IProps {
  recommendations: IMovieResult
}

const Recommendations = ({ recommendations }: IProps) => {
  return (
    <div className='overflow-hidden space-y-4'>
      <CategoryTitle cateogoryName='Recommendations' />
      <RecommendationsItem inView={Boolean(recommendations)} data={recommendations} />
    </div>
  )
}

export default Recommendations
