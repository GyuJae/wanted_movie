import dynamic from 'next/dynamic'
import { useMe } from '@hooks/user'
import { useState } from 'react'

const Avatar = dynamic(() => import('@components/Avatar'), { ssr: false })
const EditForm = dynamic(() => import('./EditForm'), { ssr: false })
const PencliIcon = dynamic(() => import('@components/Icons/PencliIcon'), { ssr: false })

const styles = {
  wrapper: 'flex justify-between px-1',
  container: 'flex space-x-3',
  subContainer: 'flex flex-col justify-center',
  username: 'text-lg',
  email: 'text-xs text-zinc-500',
  pencliIcon: 'w-3 fill-zinc-400',
}

const UserInfo = () => {
  const [openEditForm, setOpenEditForm] = useState<boolean>(false)
  const { data } = useMe()

  const handleOpenEditForm = () => setOpenEditForm(true)
  const handleCloseEditForm = () => setOpenEditForm(false)

  if (!data || !data.user) return null
  const { user } = data
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Avatar path={user.avatar} />
        <div className={styles.subContainer}>
          <span className={styles.username}>{user.username}</span>
          <span className={styles.email}>{user.email}</span>
        </div>
      </div>
      <button type='button' onClick={handleOpenEditForm}>
        <PencliIcon styleClassname={styles.pencliIcon} />
      </button>
      <EditForm inView={openEditForm} handleCloseEditForm={handleCloseEditForm} />
    </div>
  )
}

export default UserInfo
