import { AnimatePresence, Variants, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

interface ICarousel {
  children: React.ReactNode
  totalWidth: number
}

const variants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
}

const Carousel = ({ children, totalWidth }: ICarousel) => {
  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        variants={variants}
        initial='initial'
        animate='animate'
        exit='exit'
        className='overflow-hidden w-full cursor-grab'
        transition={{
          duration: 0.7,
        }}
        whileTap={{ cursor: 'grabbing' }}
      >
        <motion.div drag='x' dragConstraints={{ right: 0, left: -totalWidth }} className='flex space-x-4'>
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default Carousel
