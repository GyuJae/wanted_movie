import classNames from 'classnames'
import { motion } from 'framer-motion'

interface IProps {
  inView: boolean
  category: string
  size: 'large' | 'medium' | 'small'
}

const styles = {
  wrapper: 'flex space-x-4',
  container: (size: 'large' | 'medium' | 'small') =>
    classNames('bg-zinc-800 rounded-xl', {
      'min-w-[19rem] h-48': size === 'medium',
      'min-w-[22rem] h-60': size === 'large',
      'min-w-[13rem] min-h-[13rem]': size === 'small',
    }),
}

const Skeleton = ({ inView, category, size }: IProps) => {
  if (!inView) return null
  return (
    <div className={styles.wrapper}>
      {Array(6)
        .fill(1)
        .map((item, index) => {
          const key = `${category}-loading-${item + index}`
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
              className={styles.container(size)}
            />
          )
        })}
    </div>
  )
}

export default Skeleton
