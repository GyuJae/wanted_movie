import Bookmark from './Bookmark'
import { ITVDetail } from 'types/tv'
import dynamic from 'next/dynamic'

const Post = dynamic(() => import('./Post'))

interface IProps {
  tv: ITVDetail
}

const FuncItems = ({ tv }: IProps) => {
  return (
    <div className='flex justify-end px-12 space-x-3'>
      <Bookmark tv={tv} />
      <Post tv={tv} />
    </div>
  )
}

export default FuncItems
