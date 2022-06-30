/* eslint-disable no-underscore-dangle */
import { IDetailPost } from 'types/post'

interface IProps {
  post: IDetailPost
}

const styles = {
  wrapper: '',
  container: 'py-8',
  countContainer: 'flex space-x-2 text-zinc-500 text-sm',
}

const TextInfo = ({ post }: IProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>{post.text}</div>
      <div className={styles.countContainer}>
        <span>Like {post._count.Like}</span>
        <span>Comment {post._count.Comment}</span>
      </div>
    </div>
  )
}

export default TextInfo
