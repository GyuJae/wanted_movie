import { motion } from 'framer-motion'

const Skeleton = () => {
  return (
    <motion.div
      animate={{
        opacity: [0.4, 1, 0.4],
      }}
      transition={{
        duration: 1.6,
        repeat: Infinity,
      }}
      className='min-w-[19rem] h-48 bg-zinc-800 rounded-xl'
    />
  )
}

export default Skeleton
