import Avatar from '@components/Avatar'
import { ICommentWithUser } from 'types/comment'
import { getDiffNowTime } from '@utils/getDiffNowTime'

interface IProps {
  comment: ICommentWithUser
}

const styles = {
  wrapper: 'flex justify-between',
  leftContainer: 'flex space-x-2',
  leftInfoContainer: 'flex flex-col text-sm',
  username: '',
  comment: 'text-zinc-400',
  createdAt: 'text-sm text-zinc-600',
}

const CommentItem = ({ comment }: IProps) => {
  return (
    <li className={styles.wrapper}>
      <div className={styles.leftContainer}>
        <Avatar size='small' path={comment.user.avatar} />
        <div className={styles.leftInfoContainer}>
          <span className={styles.username}>{comment.user.username}</span>
          <span className={styles.comment}>{comment.comment}</span>
        </div>
      </div>
      <div>
        <span className={styles.createdAt}>{getDiffNowTime(comment.createdAt)}</span>
      </div>
    </li>
  )
}

export default CommentItem
