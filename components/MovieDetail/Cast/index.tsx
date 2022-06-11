import Carousel from '@components/Carousel'
import { IMovieCredits } from 'types/movie'
import dynamic from 'next/dynamic'

const CastItem = dynamic(() => import('./CastItem'), { ssr: false })
const CategoryTitle = dynamic(() => import('@components/CategoryTitle'), { ssr: false })

interface IProps {
  credits: IMovieCredits
}

const Cast = ({ credits }: IProps) => {
  return (
    <div className='overflow-hidden space-y-4'>
      <CategoryTitle cateogoryName='Cast' />
      <Carousel totalWidth={credits.cast.length * 158}>
        {credits.cast.map((item, index) => {
          const key = `cast-${item.id}-${index}`
          return <CastItem key={key} cast={item} />
        })}
      </Carousel>
    </div>
  )
}

export default Cast
