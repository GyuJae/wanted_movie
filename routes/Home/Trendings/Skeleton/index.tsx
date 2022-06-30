import { motion } from 'framer-motion'

interface IProps {
  inView: boolean
}

const styles = {
  wrapper: 'flex space-x-4',
  container: 'min-w-[22rem] h-60 bg-zinc-800 rounded-xl',
}

const Skeleton = ({ inView }: IProps) => {
  if (!inView) return null
  return (
    <div className={styles.wrapper}>
      {Array(10)
        .fill(1)
        .map((item, index) => {
          const key = `trending-skeleton-${item + index}`
          return (
            <motion.div
              key={key}
              animate={{
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
              }}
              className={styles.container}
            />
          )
        })}
    </div>
  )
}

export default Skeleton
