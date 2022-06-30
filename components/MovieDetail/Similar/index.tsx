import { IMovieResult } from 'types/movie'
import dynamic from 'next/dynamic'

const SimilarItem = dynamic(() => import('@components/Home/Current/Movies'), { ssr: false })
const CategoryTitle = dynamic(() => import('@components/CategoryTitle'), { ssr: false })

interface IProps {
  similar: IMovieResult
}

const Similar = ({ similar }: IProps) => {
  return (
    <div className='overflow-hidden space-y-4'>
      <CategoryTitle cateogoryName='Similar' />
      <SimilarItem inView={Boolean(similar)} data={similar} />
    </div>
  )
}

export default Similar
