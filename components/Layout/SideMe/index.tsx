import dynamic from 'next/dynamic'
import { showSideMeState } from '@atoms/showSideMe'
import { useClickAway } from 'react-use'
import { useRecoilState } from 'recoil'
import { useRef } from 'react'

import { AnimatePresence, Variants, motion } from 'framer-motion'

const UserInfo = dynamic(() => import('./UserInfo'))
const Bookmark = dynamic(() => import('./Bookmark'))
const RecentView = dynamic(() => import('./RecentView'))
const SearchForm = dynamic(() => import('@components/SearchPage/SearchForm'))

interface IProps {
  inView: boolean
}

const sideVariants: Variants = {
  initial: {
    x: 400,
  },
  animate: {
    x: 0,
  },
  exit: {
    x: 400,
  },
}

const styles = {
  wrapper: 'flex fixed right-0 z-20 flex-col justify-between py-2 px-4 w-80 h-screen bg-zinc-900',
  container: 'space-y-4',
}

const SideMe = ({ inView }: IProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [showSideMe, setShowSideMe] = useRecoilState(showSideMeState)
  const handleHiddenSideMe = () => setShowSideMe(false)

  useClickAway(ref, handleHiddenSideMe)
  if (!showSideMe) return <AnimatePresence initial={false} />
  if (!inView) return null
  return (
    <AnimatePresence initial={false}>
      <motion.div
        ref={ref}
        className={styles.wrapper}
        variants={sideVariants}
        initial='initial'
        animate='animate'
        exit='exit'
        transition={{
          type: 'tween',
        }}
      >
        <div className={styles.container}>
          <UserInfo />
          <SearchForm />
        </div>
        <div className={styles.container}>
          <RecentView />
          <Bookmark />
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default SideMe
