import { IResponse } from '@libs/withHandler'
import dynamic from 'next/dynamic'
import { logout } from '@services/users.service'
import { opacityVariants } from '@animations/variants'
import { showNavState } from '@atoms/showNavState'
import { useMe } from '@hooks/user'
import { useRecoilValue } from 'recoil'

import { AnimatePresence, motion } from 'framer-motion'
import { useMutation, useQueryClient } from 'react-query'

const LogoutIcon = dynamic(() => import('@components/Icons/LogoutIcon'))

const Logout = () => {
  const queryClient = useQueryClient()
  const showNav = useRecoilValue(showNavState)
  const { data } = useMe()
  const { mutate } = useMutation('logout', logout, {
    onSuccess: ({ ok }: IResponse) => {
      if (ok) queryClient.refetchQueries(['user', 'me'])
    },
  })

  const handleLogout = () => mutate()
  if (!data || !data.ok) return null
  return (
    <button
      type='button'
      onClick={handleLogout}
      className='flex items-center px-5 space-x-3 h-12 text-sm hover:bg-zinc-800'
    >
      <LogoutIcon styleClassname='w-5 fill-zinc-600' />
      <AnimatePresence initial={false}>
        {showNav && (
          <motion.div variants={opacityVariants} initial='initial' animate='animate' exit='exit'>
            Logout
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  )
}

export default Logout
