import classNames from 'classnames'
import { motion } from 'framer-motion'
import { showNavState } from '@atoms/showNavState'
import { useRecoilValue } from 'recoil'

const styles = {
  container: (showNavValue: boolean) =>
    classNames('bg-zinc-800 rounded-xl', { 'w-[11rem] h-[16rem]': showNavValue, 'w-[12rem] h-[18rem]': !showNavValue }),
}

const SkeletonItem = () => {
  const showNavValue = useRecoilValue(showNavState)
  return (
    <motion.div
      animate={{
        opacity: [0.4, 1, 0.4],
      }}
      transition={{
        duration: 1.6,
        repeat: Infinity,
      }}
      className={styles.container(showNavValue)}
    />
  )
}

export default SkeletonItem
