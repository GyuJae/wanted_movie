import { accountOpenState } from '@atoms/accountOpenState'
import dynamic from 'next/dynamic'
import { useClickAway } from 'react-use'
import { useRecoilState } from 'recoil'

import { useRef, useState } from 'react'

const CreateAccount = dynamic(() => import('./CreateAccount'))
const Login = dynamic(() => import('./Login'))
const Status = dynamic(() => import('./Status'))
const TagName = dynamic(() => import('./TagName'))

const styles = {
  wrapper: 'flex fixed top-0 left-0 z-20 justify-center items-center w-screen h-screen bg-zinc-900/90',
  container: 'py-4 px-8 space-y-2 w-[30rem] bg-black rounded-xl',
}

const AccountForm = () => {
  const [open, setOpen] = useRecoilState(accountOpenState)
  const containerRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<'login' | 'createAccount'>('login')

  const handleClose = () => setOpen(false)
  const handleSetLogin = () => setStatus('login')
  const handleSetCreateAccount = () => setStatus('createAccount')

  useClickAway(containerRef, handleClose)

  if (!open) return null
  return (
    <div className={styles.wrapper}>
      <div ref={containerRef} className={styles.container}>
        <TagName status={status} />
        <Login inView={status === 'login'} handleClose={handleClose} />
        <CreateAccount inView={status === 'createAccount'} handleSetLogin={handleSetLogin} />
        <Status status={status} handleSetLogin={handleSetLogin} handleSetCreateAccount={handleSetCreateAccount} />
      </div>
    </div>
  )
}

export default AccountForm
