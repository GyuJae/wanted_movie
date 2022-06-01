import Carousel from '@components/Carousel'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { useTVSimilar } from '@hooks/tv'

const SimilarItem = dynamic(() => import('./SimilarItem'))
const Skeleton = dynamic(() => import('@components/Home/Skeleton'))
const CategoryTitle = dynamic(() => import('@components/CategoryTitle'))

interface IProps {
  id: string
}

const styles = {
  wrapper: 'space-y-4',
}

const Similar = ({ id }: IProps) => {
  const { data } = useTVSimilar(id)
  if (!data || data.results.length === 0) return null
  return (
    <div className={styles.wrapper}>
      <CategoryTitle cateogoryName='Similar' />
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
