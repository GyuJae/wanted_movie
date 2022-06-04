import dynamic from 'next/dynamic'
import { useMe } from '@hooks/user'
import { useState } from 'react'

const Avatar = dynamic(() => import('@components/Avatar'))
const EditForm = dynamic(() => import('./EditForm'))
const PencliIcon = dynamic(() => import('@components/Icons/PencliIcon'))

const UserInfo = () => {
  const [openEditForm, setOpenEditForm] = useState<boolean>(false)
  const { data } = useMe()

  const handleOpenEditForm = () => setOpenEditForm(true)
  const handleCloseEditForm = () => setOpenEditForm(false)

  if (!data || !data.user) return null
  const { user } = data
  return (
    <div className='flex justify-between px-1'>
      <div className='flex space-x-3'>
        <Avatar path={user.avatar} />
        <div className='flex flex-col justify-center'>
          <span className='text-lg'>{user.username}</span>
          <span className='text-xs text-zinc-500'>{user.email}</span>
        </div>
      </div>
      <button type='button' onClick={handleOpenEditForm}>
        <PencliIcon styleClassname='w-3 fill-zinc-400' />
      </button>
      <EditForm inView={openEditForm} handleCloseEditForm={handleCloseEditForm} />
    </div>
  )
}

export default UserInfo
