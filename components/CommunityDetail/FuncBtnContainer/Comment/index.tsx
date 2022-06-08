import dynamic from 'next/dynamic'
import { useState } from 'react'

const CommentIcon = dynamic(() => import('@components/Icons/CommentIcon'), { ssr: false })
const CommentForm = dynamic(() => import('./CommentForm'), { ssr: false })

interface IProps {
  postId: number
}

const styles = {
  item: 'w-full',
  button: 'w-full py-2 flex justify-center items-center space-x-2 rounded-md fill-zinc-400 hover:bg-zinc-900',
  buttonName: 'text-sm text-zinc-400',
}

const Comment = ({ postId }: IProps) => {
  const [formOpen, setFormOpen] = useState<boolean>(false)

  const handleFormOpen = () => setFormOpen(true)
  const handleFormClose = () => setFormOpen(false)

  return (
    <li className={styles.item}>
      <button type='button' onClick={handleFormOpen} className={styles.button}>
        <CommentIcon styleClassname='w-4' />
        <span className={styles.buttonName}>Comment</span>
      </button>
      <CommentForm inView={formOpen} handleFormClose={handleFormClose} postId={postId} />
    </li>
  )
}

export default Comment
