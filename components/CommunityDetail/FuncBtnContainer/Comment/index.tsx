import dynamic from 'next/dynamic'

const CommentIcon = dynamic(() => import('@components/Icons/CommentIcon'), { ssr: false })

const styles = {
  item: 'w-full',
  button: 'w-full py-2 flex justify-center items-center space-x-2 rounded-md fill-zinc-400 hover:bg-zinc-900',
  buttonName: 'text-sm text-zinc-400',
}

const Comment = () => {
  return (
    <li className={styles.item}>
      <button type='button' className={styles.button}>
        <CommentIcon styleClassname='w-4' />
        <span className={styles.buttonName}>Comment</span>
      </button>
    </li>
  )
}

export default Comment
