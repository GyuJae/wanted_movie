import { accountOpenState } from '@atoms/accountOpenState'
import dynamic from 'next/dynamic'
import { loginToastMessageState } from '@atoms/loginToastMessageState'
import { useClickAway } from 'react-use'
import { useMe } from '@hooks/user'
import { useRef } from 'react'

import { AnimatePresence, Variants, motion } from 'framer-motion'
import { useRecoilState, useSetRecoilState } from 'recoil'

const ExclamationIcon = dynamic(() => import('@components/Icons/ExclamationIcon'))
const XIcon = dynamic(() => import('@components/Icons/XIcon'))

const variants: Variants = {
  initial: {
    opacity: 0,
    x: 300,
  },
  animate: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: 300,
  },
}

const styles = {
  wrapper: 'flex fixed top-10 right-10 z-30 py-3 px-2 space-x-4 w-[20rem] h-20 bg-rose-700 rounded-md',
  xBtn: 'absolute right-3',
  xIcon: 'w-2 fill-zinc-200 hover:fill-zinc-300',
  exclamationIcon: 'w-8 fill-white',
  container: 'flex flex-col',
  mainMessage: 'text-xl font-semibold',
  subMessage: 'flex items-center space-x-1 text-sm text-zinc-200',
  yesBtn: 'px-2 text-base hover:underline rounded-sm',
}

const LoginToastMessage = () => {
  const ref = useRef<HTMLDivElement>(null)
  const setLoginForm = useSetRecoilState(accountOpenState)
  const [showLoginToastMessage, setShowLoginToastMessage] = useRecoilState(loginToastMessageState)
  const { data } = useMe()

  const handleCloseToastMessage = () => setShowLoginToastMessage(false)
  const handleOpenLoginForm = () => {
    setLoginForm(true)
    handleCloseToastMessage()
  }

  useClickAway(ref, handleCloseToastMessage)

  if (!showLoginToastMessage || data?.ok) return <AnimatePresence />
  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        variants={variants}
        initial='initial'
        animate='animate'
        exit='exit'
        transition={{
          type: 'tween',
        }}
        className={styles.wrapper}
      >
        <button type='button' onClick={handleCloseToastMessage} className={styles.xBtn}>
          <XIcon styleClassname={styles.xIcon} />
        </button>
        <ExclamationIcon styleClassName={styles.exclamationIcon} />
        <div className={styles.container}>
          <span className={styles.mainMessage}>Required login</span>
          <div className={styles.subMessage}>
            <span>go to the login screen?</span>
            <button type='button' onClick={handleOpenLoginForm} className={styles.yesBtn}>
              Yes
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default LoginToastMessage
