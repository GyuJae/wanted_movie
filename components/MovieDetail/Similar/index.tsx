import Carousel from '@components/Carousel'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { useMovieSimilar } from '@hooks/movie'

const SimilarItem = dynamic(() => import('./SimilarItem'))
const Skeleton = dynamic(() => import('@components/Home/Skeleton'))
const CategoryTitle = dynamic(() => import('@components/CategoryTitle'))

interface IProps {
  id: string
}

const Similar = ({ id }: IProps) => {
  const { data } = useMovieSimilar(id)
  if (!data || data.results.length === 0) return null
  return (
    <div className='overflow-hidden space-y-4'>
      <CategoryTitle cateogoryName='Similar' />
      <Suspense fallback={<Skeleton />}>
        <Carousel totalWidth={data.results.filter((movie) => !!movie.backdrop_path).length * 257}>
          {data?.results.map((movie, index) => {
            const key = `similar-${movie.id}-${index}`
            return <SimilarItem key={key} movie={movie} />
          })}
        </Carousel>
      </Suspense>
    </div>
  )
}

export default Similar
