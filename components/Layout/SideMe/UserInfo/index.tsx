import dynamic from 'next/dynamic'
import { useMe } from '@hooks/user'

const Avatar = dynamic(() => import('@components/Avatar'))

const UserInfo = () => {
  const { data } = useMe()
  if (!data || !data.user) return null
  const { user } = data
  return (
    <div className='flex space-x-3'>
      <Avatar path={user.avatar} />
      <div className='flex flex-col justify-center'>
        <span className='text-lg'>{user.username}</span>
        <span className='text-xs text-zinc-500'>{user.email}</span>
      </div>
    </div>
  )
}

export default UserInfo
