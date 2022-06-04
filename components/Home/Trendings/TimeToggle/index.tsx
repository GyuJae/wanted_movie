import classNames from 'classnames'
import { motion } from 'framer-motion'
import { timeTrendingState } from 'atoms/timeTrendingState'
import { useRecoilState } from 'recoil'

const styles = {
  wrapper:
    'flex relative justify-around items-center mt-1 w-32 h-7 text-xs font-semibold text-zinc-700 bg-zinc-900 rounded-full border-2 border-zinc-800',
  button: (current: boolean) => classNames('z-10 font-semibold', { 'text-zinc-300': current }),
  background: (left: boolean, right: boolean) =>
    classNames('absolute w-1/2 h-full bg-zinc-700 rounded-full', { 'left-0': left }, { 'right-0': right }),
}

const TimeToggle = () => {
  const [time, setTime] = useRecoilState(timeTrendingState)

  const handleClickDay = () => setTime('day')
  const handleClickWeek = () => setTime('week')

  return (
    <motion.div className={styles.wrapper}>
      <motion.div layout className={styles.background(time === 'day', time === 'week')} />
      <button type='button' onClick={handleClickDay} className={styles.button(time === 'day')}>
        Today
      </button>
      <button type='button' onClick={handleClickWeek} className={styles.button(time === 'week')}>
        Week
      </button>
    </motion.div>
  )
}

export default TimeToggle
