import dynamic from 'next/dynamic'
import { useMovieRecommendations } from '@hooks/movie'

const RecommendationsItem = dynamic(() => import('@components/Home/Current/Movies'), { ssr: false })
const CategoryTitle = dynamic(() => import('@components/CategoryTitle'), { ssr: false })

interface IProps {
  id: string
}

const Recommendations = ({ id }: IProps) => {
  const { data } = useMovieRecommendations(id)
  if (!data || data.results.length === 0) return null
  return (
    <div className='overflow-hidden space-y-4'>
      <CategoryTitle cateogoryName='Recommendations' />
      <RecommendationsItem inView={Boolean(data)} data={data} />
    </div>
  )
}

export default Recommendations
