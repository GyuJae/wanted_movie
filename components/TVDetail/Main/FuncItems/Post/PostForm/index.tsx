import { IPostResponse } from 'types/post'
import { ITVDetail } from 'types/tv'
import XIcon from '@components/Icons/XIcon'
import { createPost } from '@services/posts.service'
import dynamic from 'next/dynamic'
import { useClickAway } from 'react-use'
import { useMe } from '@hooks/user'
import { useMutation } from 'react-query'

import { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const Avatar = dynamic(() => import('@components/Avatar'), { ssr: false })
const Vote = dynamic(() => import('@components/MovieDetail/Main/FuncItems/Post/PostForm/Vote'), { ssr: false })

interface IProps {
  inView: boolean
  setOpenForm: Dispatch<SetStateAction<boolean>>
  tv: ITVDetail
}

interface IForm {
  text: string
  vote: number
}

const styles = {
  wrapper: 'flex fixed top-0 left-0 z-20 justify-center items-center w-screen h-screen bg-zinc-900/90',
  container: 'py-2 min-w-[37rem]  bg-black rounded-md',
  xButtonContainer: 'py-3 px-4 border-b-[1px] border-zinc-800',
  xIcon: 'w-4 fill-zinc-700 hover:fill-zinc-800',
  subContainer: 'flex py-2 px-4 space-x-4',
  form: 'flex flex-col py-3 space-y-2 w-11/12',
  input: 'py-1 px-2 w-full bg-transparent border-b-2 border-zinc-700 outline-none',
  button: 'py-2 px-4 bg-red-700 rounded-full',
}

const PostForm = ({ inView, setOpenForm, tv }: IProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const handleClose = () => setOpenForm(false)
  const { data: meData } = useMe()
  const { register, handleSubmit, watch, setValue } = useForm<IForm>()
  const { mutate, isLoading } = useMutation(['post', 'create'], createPost, {
    onSuccess: ({ ok }: IPostResponse) => {
      if (ok) handleClose()
    },
  })

  const handleVoteValue = (voteValue: number) => setValue('vote', voteValue)
  const voteValue = watch('vote')

  useEffect(() => {
    setValue('vote', 3.0)
  }, [setValue])

  const onSubmit: SubmitHandler<IForm> = ({ text, vote }) => {
    if (!tv.poster_path || isLoading) return
    mutate({
      text,
      mediaType: 'tv',
      mediaId: tv.id,
      posterPath: tv.poster_path,
      mediaTitle: tv.name,
      vote,
    })
  }

  useClickAway(ref, handleClose)

  if (!inView || !meData || !meData.user) return null

  return (
    <div className={styles.wrapper}>
      <div ref={ref} className={styles.container}>
        <div className={styles.xButtonContainer}>
          <button type='button' onClick={handleClose}>
            <XIcon styleClassname={styles.xIcon} />
          </button>
        </div>
        <div className={styles.subContainer}>
          <Avatar path={meData.user.avatar} />
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <input
              {...register('text', { required: true })}
              className={styles.input}
              placeholder='What do you think this TV Show?'
              autoComplete='off'
              autoCapitalize='off'
            />
            <Vote handleVoteValue={handleVoteValue} voteValue={voteValue} />
            <input {...register('vote', { min: 0, max: 5, valueAsNumber: true })} className='hidden' />
            <button type='submit' className={styles.button}>
              Comment
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PostForm
