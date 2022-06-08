import Avatar from '@components/Avatar'
import { getDiffNowTime } from '@utils/getDiffNowTime'

interface IProps {
  writer: {
    id: number
    avatar: string | null
    username: string
  }
  createdAt: Date
}

const styles = {
  wrapper: 'flex items-center space-x-2 ',
  username: 'text-sm text-zinc-400',
  diffTime: 'text-xs text-zinc-500',
}

const UserInfo = ({ writer, createdAt }: IProps) => {
  const diffTime = getDiffNowTime(createdAt)
  return (
    <div className={styles.wrapper}>
      <Avatar size='small' path={writer.avatar} />
      <span className={styles.username}>{writer.username}</span>
      <span className={styles.diffTime}>{diffTime}</span>
    </div>
  )
}

export default UserInfo
