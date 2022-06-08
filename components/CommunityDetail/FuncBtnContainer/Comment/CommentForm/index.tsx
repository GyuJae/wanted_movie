import dynamic from 'next/dynamic'
import { useClickAway } from 'react-use'
import { useForm } from 'react-hook-form'
import { useRef } from 'react'
import { useRouter } from 'next/router'

const Portal = dynamic(() => import('@components/Portal'), { ssr: false })

interface IProps {
  inView: boolean
  handleFormClose: () => void
}

interface IForm {
  comment: string
}

const styles = {
  wrapper: 'flex absolute top-0 justify-center items-center w-screen h-screen bg-zinc-800/80',
  container: 'w-96 h-96 bg-zinc-900 rounded-md shadow-lg',
  title: 'py-2 px-4 text-lg font-semibold text-left',
  textarea: 'py-1 px-2 w-full h-72 bg-zinc-900 outline-none resize-none scrollBar',
  submitContainer: 'flex justify-end items-center py-2 px-4 space-x-3 w-full',
  commentLenContainer: 'text-sm text-zinc-500',
  submitBtn: 'p-2 px-4 text-sm bg-red-700 rounded-md shadow-md',
}

const CommentForm = ({ inView, handleFormClose }: IProps) => {
  const {
    query: { id },
  } = useRouter()
  const { register, watch } = useForm<IForm>()
  const ref = useRef<HTMLDivElement>(null)

  const comment = watch('comment') || ''

  useClickAway(ref, handleFormClose)

  if (!inView) return null
  return (
    <Portal>
      <div className={styles.wrapper}>
        <div ref={ref} className={styles.container}>
          <div className={styles.title}>Comment</div>
          <form>
            <textarea
              className={styles.textarea}
              maxLength={10000}
              placeholder='What do you think this post?'
              {...register('comment', { required: true, maxLength: 10000 })}
            />
            <div className={styles.submitContainer}>
              <div className={styles.commentLenContainer}>
                <span>{comment.length}</span>
                <span>/</span>
                <span>10000</span>
              </div>
              <button type='submit' className={styles.submitBtn}>
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </Portal>
  )
}

export default CommentForm
