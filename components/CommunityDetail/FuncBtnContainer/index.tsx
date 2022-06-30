import dynamic from 'next/dynamic'

const Like = dynamic(() => import('./Like'))
const Comment = dynamic(() => import('./Comment'))

interface IProps {
  postId: number
}

const styles = {
  wrapper: 'flex py-1 px-2 border-y-[1.5px] border-zinc-800',
}

const FuncBtnContainer = ({ postId }: IProps) => {
  return (
    <ul className={styles.wrapper}>
      <Like postId={postId} />
      <Comment postId={postId} />
    </ul>
  )
}

export default FuncBtnContainer
