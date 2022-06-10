import dynamic from 'next/dynamic'
import { useMovieSimilar } from '@hooks/movie'

const SimilarItem = dynamic(() => import('@components/Home/Current/Movies'), { ssr: false })
const CategoryTitle = dynamic(() => import('@components/CategoryTitle'), { ssr: false })

interface IProps {
  id: string
}

const Similar = ({ id }: IProps) => {
  const { data } = useMovieSimilar(id)
  if (!data || data.results.length === 0) return null
  return (
    <div className='overflow-hidden space-y-4'>
      <CategoryTitle cateogoryName='Similar' />
      <SimilarItem inView={Boolean(data)} data={data} />
    </div>
  )
}

export default Similar
