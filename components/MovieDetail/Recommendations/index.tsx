import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { useMovieRecommendations } from '@hooks/movie'

const RecommendationsItem = dynamic(() => import('@components/Home/Current/Movies'))
const Skeleton = dynamic(() => import('@components/Home/Skeleton'))
const CategoryTitle = dynamic(() => import('@components/CategoryTitle'))

interface IProps {
  id: string
}

const Recommendations = ({ id }: IProps) => {
  const { data } = useMovieRecommendations(id)
  if (!data || data.results.length === 0) return null
  return (
    <div className='overflow-hidden space-y-4'>
      <CategoryTitle cateogoryName='Recommendations' />
      <Suspense fallback={<Skeleton />}>
        <RecommendationsItem inView={Boolean(data)} data={data} />
      </Suspense>
    </div>
  )
}

export default Recommendations
