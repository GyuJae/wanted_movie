import { motion } from 'framer-motion'

import { useEffect, useRef, useState } from 'react'

interface ICarousel {
  children: React.ReactNode
}

const Carousel = ({ children }: ICarousel) => {
  const [width, setWidth] = useState<number>(0)
  const carousel = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setWidth(
      carousel.current && carousel.current.offsetParent
        ? carousel.current.scrollWidth - carousel.current.offsetParent.clientWidth + 200
        : 0
    )
  }, [])

  return (
    <motion.div className='overflow-hidden w-full cursor-grab' ref={carousel} whileTap={{ cursor: 'grabbing' }}>
      <motion.div drag='x' dragConstraints={{ right: 0, left: -width }} className='flex space-x-4'>
        {children}
      </motion.div>
    </motion.div>
  )
}

export default Carousel
