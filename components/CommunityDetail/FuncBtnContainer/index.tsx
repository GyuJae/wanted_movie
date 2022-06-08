import dynamic from 'next/dynamic'

const Like = dynamic(() => import('./Like'))
const Comment = dynamic(() => import('./Comment'))

const styles = {
  wrapper: 'flex py-1 px-2 border-y-[1.5px] border-zinc-800',
}

const FuncBtnContainer = () => {
  return (
    <ul className={styles.wrapper}>
      <Like />
      <Comment />
    </ul>
  )
}

export default FuncBtnContainer
