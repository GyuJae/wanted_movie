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
        className='flex fixed top-10 right-10 z-30 py-3 px-2 space-x-4 w-[20rem] h-20 bg-rose-700 rounded-md'
      >
        <button type='button' onClick={handleCloseToastMessage} className='absolute right-3'>
          <XIcon styleClassname='w-2 fill-zinc-200 hover:fill-zinc-300' />
        </button>
        <ExclamationIcon styleClassName='w-8 fill-white' />
        <div className='flex flex-col'>
          <span className='text-xl font-semibold'>Required login</span>
          <div className='flex items-center space-x-1 text-sm text-zinc-200'>
            <span>go to the login screen?</span>
            <button type='button' onClick={handleOpenLoginForm} className='px-2 text-base hover:underline rounded-sm'>
              Yes
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default LoginToastMessage
