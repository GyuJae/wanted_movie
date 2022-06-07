import dynamic from 'next/dynamic'

const CommentIcon = dynamic(() => import('@components/Icons/CommentIcon'), { ssr: false })
const ThumbsUpIcon = dynamic(() => import('@components/Icons/ThumbsUpIcon'), { ssr: false })

const styles = {
  wrapper: 'flex py-1 px-2 border-y-[1.5px] border-zinc-800',
  item: 'w-full',
  button: 'w-full py-2 flex justify-center items-center space-x-2 rounded-md fill-zinc-400 hover:bg-zinc-900',
  buttonName: 'text-sm text-zinc-400',
}

const FuncBtnContainer = () => {
  return (
    <ul className={styles.wrapper}>
      <li className={styles.item}>
        <button type='button' className={styles.button}>
          <CommentIcon styleClassname='w-4' />
          <span className={styles.buttonName}>Comment</span>
        </button>
      </li>
      <li className={styles.item}>
        <button type='button' className={styles.button}>
          <ThumbsUpIcon styleClassname='w-4' />
          <span className={styles.buttonName}>Like</span>
        </button>
      </li>
    </ul>
  )
}

export default FuncBtnContainer
