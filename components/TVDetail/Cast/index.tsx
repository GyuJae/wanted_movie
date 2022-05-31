import Carousel from '@components/Carousel'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { useTVCredits } from '@hooks/tv'

const CastItem = dynamic(() => import('./CastItem'))

interface IProps {
  id: string
}

const Cast = ({ id }: IProps) => {
  const { data } = useTVCredits(id)
  if (!data) return null

  return (
    <div className='space-y-4'>
      <div className='flex items-center'>
        <div className='flex items-center space-x-2'>
          <h3 className='text-xl font-semibold'>Cast</h3>
        </div>
      </div>
      <Suspense fallback={<div>loading..</div>}>
        <Carousel totalWidth={data.cast.length * 149}>
          {data?.cast.map((item, index) => {
            const key = `cast-${item.id}-${index}`
            return <CastItem key={key} cast={item} />
          })}
        </Carousel>
      </Suspense>
    </div>
  )
}

export default Cast
