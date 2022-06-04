import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { useMovieSimilar } from '@hooks/movie'

const SimilarItem = dynamic(() => import('@components/Home/Current/Movies'))
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
        <SimilarItem inView={Boolean(data)} data={data} />
      </Suspense>
    </div>
  )
}

export default Similar
