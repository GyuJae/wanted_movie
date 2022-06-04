import { IMovieDetail } from 'types/movie'
import PostForm from './PostForm'
import dynamic from 'next/dynamic'
import { loginToastMessageState } from '@atoms/loginToastMessageState'
import { useMe } from '@hooks/user'
import { useSetRecoilState } from 'recoil'
import { useState } from 'react'

const PencliIcon = dynamic(() => import('@components/Icons/PencliIcon'))

interface IProps {
  movie: IMovieDetail
}

const styles = {
  button: 'z-20 p-3 bg-zinc-900 hover:bg-zinc-800 rounded-full',
  icon: 'w-4 h-4 fill-zinc-500 pointer-event-none',
}

const Post = ({ movie }: IProps) => {
  const [openForm, setOpenForm] = useState<boolean>(false)
  const setOpenLoginToastMessage = useSetRecoilState(loginToastMessageState)
  const { data: meData } = useMe()
  const handleClickPencli = () => {
    if (!meData?.ok) {
      setOpenLoginToastMessage(true)
      return
    }
    setOpenForm(true)
  }
  if (!meData) return null
  return (
    <>
      <button type='button' onClick={handleClickPencli} className={styles.button}>
        <PencliIcon styleClassname={styles.icon} />
      </button>
      <PostForm movie={movie} inView={openForm} setOpenForm={setOpenForm} />
    </>
  )
}

export default Post
