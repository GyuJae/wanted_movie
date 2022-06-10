import Carousel from '@components/Carousel'
import dynamic from 'next/dynamic'
import { useTVCredits } from '@hooks/tv'

const CastItem = dynamic(() => import('@components/MovieDetail/Cast/CastItem'), { ssr: false })
const CategoryTitle = dynamic(() => import('@components/CategoryTitle'), { ssr: false })

interface IProps {
  id: string
}

const Cast = ({ id }: IProps) => {
  const { data } = useTVCredits(id)
  if (!data || data.cast.length === 0) return null

  return (
    <div className='overflow-hidden space-y-4'>
      <CategoryTitle cateogoryName='Cast' />
      <Carousel totalWidth={data.cast.length * 158}>
        {data?.cast.map((item, index) => {
          const key = `cast-${item.id}-${index}`
          return <CastItem key={key} cast={item} />
        })}
      </Carousel>
    </div>
  )
}

export default Cast
