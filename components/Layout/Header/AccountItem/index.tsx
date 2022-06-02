import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { showNavState } from '@atoms/showNavState'
import { useMe } from '@hooks/user'
import { useRecoilValue } from 'recoil'

const Login = dynamic(() => import('./Login'))
const Me = dynamic(() => import('./Me'))

const AccountItem = () => {
  const showNavValue = useRecoilValue(showNavState)
  const { data } = useMe()
  if (!data) return null
  return (
    <motion.ul
      animate={{
        marginRight: showNavValue ? 210 : 70,
      }}
      transition={{
        type: 'tween',
      }}
    >
      <Login inView={!data.ok} />
      <Me inView={data.ok} me={data.user} />
    </motion.ul>
  )
}

export default AccountItem
