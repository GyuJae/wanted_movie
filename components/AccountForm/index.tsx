import { accountOpenState } from '@atoms/accountOpenState'
import dynamic from 'next/dynamic'
import { useClickAway } from 'react-use'
import { useRecoilState } from 'recoil'

import { AnimatePresence, motion } from 'framer-motion'
import { opacityVariants, scaleYVariants } from '@animations/variants'
import { useRef, useState } from 'react'

const CreateAccount = dynamic(() => import('./CreateAccount'), { ssr: false })
const Login = dynamic(() => import('./Login'), { ssr: false })
const Status = dynamic(() => import('./Status'), { ssr: false })
const TagName = dynamic(() => import('./TagName'), { ssr: false })

const styles = {
  wrapper: 'flex z-50 fixed top-0 left-0 justify-center items-center w-screen h-screen bg-zinc-900/90',
  container: 'py-4 px-8 space-y-2 w-[20rem] bg-black rounded-xl',
}

const AccountForm = () => {
  const [open, setOpen] = useRecoilState(accountOpenState)
  const containerRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<'login' | 'createAccount'>('login')

  const handleClose = () => setOpen(false)
  const handleSetLogin = () => setStatus('login')
  const handleSetCreateAccount = () => setStatus('createAccount')

  useClickAway(containerRef, handleClose)

  if (!open) return <AnimatePresence />
  return (
    <AnimatePresence>
      <motion.div variants={opacityVariants} initial='initial' animate='animate' exit='exit' className={styles.wrapper}>
        <motion.div
          variants={scaleYVariants}
          ref={containerRef}
          transition={{ duration: 0.4 }}
          className={styles.container}
        >
          <TagName status={status} />
          <Login inView={status === 'login'} handleClose={handleClose} />
          <CreateAccount inView={status === 'createAccount'} handleSetLogin={handleSetLogin} />
          <div className='w-full h-[1.5px] bg-zinc-800' />
          <Status status={status} handleSetLogin={handleSetLogin} handleSetCreateAccount={handleSetCreateAccount} />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default AccountForm
