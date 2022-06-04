import Carousel from '@components/Carousel'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { useTVCredits } from '@hooks/tv'

const CastItem = dynamic(() => import('@components/MovieDetail/Cast/CastItem'))
const CategoryTitle = dynamic(() => import('@components/CategoryTitle'))

interface IProps {
  id: string
}

const Cast = ({ id }: IProps) => {
  const { data } = useTVCredits(id)
  if (!data) return null

  return (
    <div className='overflow-hidden space-y-4'>
      <CategoryTitle cateogoryName='Cast' />
      <Suspense fallback={<div>loading..</div>}>
        <Carousel totalWidth={data.cast.length * 158}>
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
