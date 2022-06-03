import dynamic from 'next/dynamic'
import { showSideMeState } from '@atoms/showSideMe'
import { useClickAway } from 'react-use'
import { useRecoilState } from 'recoil'
import { useRef } from 'react'

import { AnimatePresence, Variants, motion } from 'framer-motion'

const UserInfo = dynamic(() => import('./UserInfo'))
const Bookmark = dynamic(() => import('./Bookmark'))
const RecentView = dynamic(() => import('./RecentView'))

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

const SideMe = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [showSideMe, setShowSideMe] = useRecoilState(showSideMeState)
  const handleHiddenSideMe = () => setShowSideMe(false)

  useClickAway(ref, handleHiddenSideMe)
  if (!showSideMe) return <AnimatePresence initial={false} />
  return (
    <AnimatePresence initial={false}>
      <motion.div
        ref={ref}
        className='fixed right-0 z-20 py-2 px-4 space-y-4 w-80 h-screen bg-zinc-900'
        variants={sideVariants}
        initial='initial'
        animate='animate'
        exit='exit'
        transition={{
          type: 'tween',
        }}
      >
        <UserInfo />
        <RecentView />
        <Bookmark />
      </motion.div>
    </AnimatePresence>
  )
}

export default SideMe
