import CommentItem from './CommentItem'
import { ICommentWithUser } from 'types/comment'

interface IProps {
  comments: ICommentWithUser[]
}
const CommentPage = ({ comments }: IProps) => {
  return (
    <>
      {comments.map((comment, index) => {
        const key = `${comment.id}-${index}`
        return <CommentItem key={key} comment={comment} />
      })}
    </>
  )
}

export default CommentPage
