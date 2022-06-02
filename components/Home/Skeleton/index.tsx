import { motion } from 'framer-motion'

const Loading = () => {
  return (
    <div className='flex space-x-4'>
      {Array(10)
        .fill(1)
        .map((item, index) => {
          const key = `current-loading-${item + index}`
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
              className='min-w-[19rem] h-48 bg-zinc-800 rounded-xl'
            />
          )
        })}
    </div>
  )
}

export default Loading
