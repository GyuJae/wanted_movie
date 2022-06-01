import { motion } from 'framer-motion'
import { showNavState } from 'atoms/showNavState'
import { useRecoilValue } from 'recoil'

const Loading = () => {
  const showNavValue = useRecoilValue(showNavState)
  return (
    <div className='flex space-x-4'>
      {Array(10)
        .fill(1)
        .map((item, index) => {
          const key = `discovery-loading-${item + index}`
          return (
            <motion.div
              key={key}
              animate={{
                opacity: [0.4, 1, 0.4],
                width: showNavValue ? '11rem' : '12rem',
                height: showNavValue ? '16rem' : '18rem',
              }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
              }}
              className='w-[19rem] h-48 bg-zinc-800 rounded-xl'
            />
          )
        })}
    </div>
  )
}

export default Loading
