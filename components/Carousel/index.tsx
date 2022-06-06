import { opacityVariants } from '@animations/variants'

import { AnimatePresence, motion } from 'framer-motion'

interface ICarousel {
  children: React.ReactNode
  totalWidth: number
}

const styles = {
  wrapper: 'overflow-hidden w-screen cursor-grab',
  container: 'flex space-x-4',
}

const Carousel = ({ children, totalWidth }: ICarousel) => {
  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <motion.div
        variants={opacityVariants}
        initial='initial'
        animate='animate'
        exit='exit'
        className={styles.wrapper}
        whileTap={{ cursor: 'grabbing' }}
      >
        <motion.ul
          drag='x'
          dragElastic={0.01}
          dragConstraints={{ right: 0, left: -totalWidth }}
          className={styles.container}
        >
          {children}
        </motion.ul>
      </motion.div>
    </AnimatePresence>
  )
}

export default Carousel
