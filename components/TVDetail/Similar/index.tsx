import Carousel from '@components/Carousel'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { useTVSimilar } from '@hooks/tv'

const SimilarItem = dynamic(() => import('./SimilarItem'))
const Skeleton = dynamic(() => import('@components/Skeleton'))

interface IProps {
  id: string
}

const Similar = ({ id }: IProps) => {
  const { data } = useTVSimilar(id)
  if (!data || data.results.length === 0) return null
  return (
    <div className='space-y-4'>
      <div className='flex items-center'>
        <div className='flex items-center space-x-2'>
          <h3 className='text-xl font-semibold'>Similar</h3>
        </div>
      </div>
      <Suspense fallback={<Skeleton />}>
        <Carousel totalWidth={data.results.filter((tv) => !!tv.backdrop_path).length * 257}>
          {data?.results.map((tv, index) => {
            const key = `similar-${tv.id}-${index}`
            return <SimilarItem key={key} tv={tv} />
          })}
        </Carousel>
      </Suspense>
    </div>
  )
}

export default Similar
