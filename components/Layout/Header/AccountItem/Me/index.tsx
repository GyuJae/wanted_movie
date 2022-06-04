import { User } from '@prisma/client'
import dynamic from 'next/dynamic'
import { showSideMeState } from '@atoms/showSideMe'
import { useSetRecoilState } from 'recoil'

const Avatar = dynamic(() => import('@components/Avatar'))

interface IProps {
  inView: boolean
  me?: User
}

const Me = ({ inView, me }: IProps) => {
  const setSideMe = useSetRecoilState(showSideMeState)
  const handleShowSideMe = () => setSideMe(true)

  if (!inView || !me) return null
  return (
    <div>
      <button type='button' onClick={handleShowSideMe}>
        <Avatar path={me.avatar} size='small' />
      </button>
    </div>
  )
}

export default Me
