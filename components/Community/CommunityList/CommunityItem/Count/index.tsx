/* eslint-disable no-underscore-dangle */
import { PostWithUserAndCount } from 'types/post'
import dynamic from 'next/dynamic'

const ThumbsUpIcon = dynamic(() => import('@components/Icons/ThumbsUpIcon'))
const CommentIcon = dynamic(() => import('@components/Icons/CommentIcon'))

interface IProps {
  post: PostWithUserAndCount
}

const styles = {
  wrapper: 'flex space-x-3 items-center border-y-[1px] border-zinc-700 py-2 ',
  item: 'text-zinc-600 flex space-x-1',
  icon: 'w-4 fill-zinc-600',
}

const Count = ({ post }: IProps) => {
  return (
    <ul className={styles.wrapper}>
      <li className={styles.item}>
        <ThumbsUpIcon styleClassname={styles.icon} />
        <span>{post._count.Like}</span>
      </li>
      <li className={styles.item}>
        <CommentIcon styleClassname={styles.icon} />
        <span>{post._count.Comment}</span>
      </li>
    </ul>
  )
}

export default Count
