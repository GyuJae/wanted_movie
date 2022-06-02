import Carousel from '@components/Carousel'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { useMovieRecommendations } from '@hooks/movie'

const RecommendationsItem = dynamic(() => import('./RecommendationsItem'))
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
        <Carousel totalWidth={data.results.filter((movie) => !!movie.backdrop_path).length * 255}>
          {data?.results.map((movie, index) => {
            const key = `recommendation-${movie.id}-${index}`
            return <RecommendationsItem key={key} movie={movie} />
          })}
        </Carousel>
      </Suspense>
    </div>
  )
}

export default Recommendations
