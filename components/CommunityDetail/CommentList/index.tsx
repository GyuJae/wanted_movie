import dynamic from 'next/dynamic'
import { useInfiniteComments } from '@hooks/comment'

const CommentPage = dynamic(() => import('./CommentPage'))

interface IProps {
  postId: number
}

const styles = {
  wrapper: 'space-y-5',
}

const CommentList = ({ postId }: IProps) => {
  const { data } = useInfiniteComments(postId)
  if (!data) return null
  return (
    <ul className={styles.wrapper}>
      {data.pages.map((page, index) => {
        const key = `community-comment-${page.page}-${index}`
        if (!page.comments) return null
        return <CommentPage key={key} comments={page.comments} />
      })}
    </ul>
  )
}

export default CommentList
