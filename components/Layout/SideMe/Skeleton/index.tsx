import { motion } from 'framer-motion'

interface IProps {
  inView: boolean
}

const styles = {
  wrapper: 'min-w-[19rem] h-48 bg-zinc-800 rounded-xl',
}

const Skeleton = ({ inView }: IProps) => {
  if (!inView) return null
  return (
    <motion.div
      animate={{
        opacity: [0.4, 1, 0.4],
      }}
      transition={{
        duration: 1.6,
        repeat: Infinity,
      }}
      className={styles.wrapper}
    />
  )
}

export default Skeleton
