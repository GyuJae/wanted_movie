import Bookmark from './Bookmark'
import { IMovieDetail } from 'types/movie'
import dynamic from 'next/dynamic'

const Post = dynamic(() => import('./Post'), { ssr: false })

interface IProps {
  movie: IMovieDetail
}

const FuncItems = ({ movie }: IProps) => {
  return (
    <div className='flex justify-end px-12 space-x-3'>
      <Bookmark movie={movie} />
      <Post movie={movie} />
    </div>
  )
}

export default FuncItems
