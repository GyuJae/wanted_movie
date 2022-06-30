import Carousel from '@components/Carousel'
import { ITVResult } from 'types/tv'
import dynamic from 'next/dynamic'
import { getLeftDragConstraints } from '@utils/getLeftDragConstraints'

const SimilarItem = dynamic(() => import('./SimilarItem'), { ssr: false })
const CategoryTitle = dynamic(() => import('@components/CategoryTitle'), { ssr: false })

interface IProps {
  similar: ITVResult
}

const styles = {
  wrapper: 'overflow-hidden space-y-4',
}

const Similar = ({ similar }: IProps) => {
  const count = similar.results.filter((tv) => !!tv.backdrop_path).length
  return (
    <div className={styles.wrapper}>
      <CategoryTitle cateogoryName='Similar' />
      <Carousel totalWidth={getLeftDragConstraints({ count, type: 'medium' })}>
        {similar.results.map((tv, index) => {
          const key = `similar-${tv.id}-${index}`
          return <SimilarItem key={key} tv={tv} />
        })}
      </Carousel>
    </div>
  )
}

export default Similar
