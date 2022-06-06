import Carousel from '@components/Carousel'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { getLeftDragConstraints } from '@utils/getLeftDragConstraints'
import { useTVSimilar } from '@hooks/tv'

const SimilarItem = dynamic(() => import('./SimilarItem'), { ssr: false })
const Skeleton = dynamic(() => import('@components/Home/Skeleton'), { ssr: false })
const CategoryTitle = dynamic(() => import('@components/CategoryTitle'), { ssr: false })

interface IProps {
  id: string
}

const styles = {
  wrapper: 'overflow-hidden space-y-4',
}

const Similar = ({ id }: IProps) => {
  const { data } = useTVSimilar(id)
  if (!data || data.results.length === 0) return null
  const count = data.results.filter((tv) => !!tv.backdrop_path).length
  return (
    <div className={styles.wrapper}>
      <CategoryTitle cateogoryName='Similar' />
      <Suspense fallback={<Skeleton />}>
        <Carousel totalWidth={getLeftDragConstraints({ count, type: 'medium' })}>
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
