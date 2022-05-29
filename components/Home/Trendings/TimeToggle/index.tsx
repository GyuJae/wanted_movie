import classNames from 'classnames'
import { motion } from 'framer-motion'
import { timeTrendingState } from 'atoms/timeTrendingState'
import { useRecoilState } from 'recoil'

const TimeToggle = () => {
  const [time, setTime] = useRecoilState(timeTrendingState)

  const handleClickDay = () => setTime('day')
  const handleClickWeek = () => setTime('week')

  return (
    <motion.div className='flex relative justify-around items-center w-32 h-7 text-xs font-semibold text-zinc-700 bg-zinc-900 rounded-full border-2 border-zinc-800'>
      <motion.div
        layout
        className={classNames(
          'absolute w-1/2 h-full bg-zinc-700 rounded-full',
          { 'left-0': time === 'day' },
          { 'right-0': time === 'week' }
        )}
      />
      <button
        type='button'
        onClick={handleClickDay}
        className={classNames('z-10 font-semibold', { 'text-zinc-300': time === 'day' })}
      >
        Today
      </button>
      <button
        type='button'
        onClick={handleClickWeek}
        className={classNames('z-10 font-semibold', { 'text-zinc-300': time === 'week' })}
      >
        Week
      </button>
    </motion.div>
  )
}

export default TimeToggle
