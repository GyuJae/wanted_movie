import { IMovieDetail } from 'types/movie'
import { IPostResponse } from 'types/post'
import XIcon from '@components/Icons/XIcon'
import { createPost } from '@services/posts.service'
import dynamic from 'next/dynamic'
import { useClickAway } from 'react-use'
import { useMe } from '@hooks/user'
import { useMutation } from 'react-query'

import { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

const Avatar = dynamic(() => import('@components/Avatar'))
const Vote = dynamic(() => import('./Vote'))

interface IProps {
  inView: boolean
  setOpenForm: Dispatch<SetStateAction<boolean>>
  movie: IMovieDetail
}

interface IForm {
  text: string
  vote: number
}

const PostForm = ({ inView, setOpenForm, movie }: IProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const handleClose = () => setOpenForm(false)
  const { data: meData } = useMe()
  const { register, handleSubmit, setValue, watch } = useForm<IForm>()
  const { mutate } = useMutation(['post', 'create'], createPost, {
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
    if (!movie.poster_path) return
    mutate({
      text,
      mediaType: 'movie',
      mediaId: movie.id,
      posterPath: movie.poster_path,
      mediaTitle: movie.title,
      vote,
    })
  }

  useClickAway(ref, handleClose)

  if (!inView || !meData || !meData.user) return null
  return (
    <div className='flex fixed top-0 left-0 z-20 justify-center items-center w-screen h-screen bg-zinc-900/90'>
      <div ref={ref} className='py-2 min-w-[37rem]  bg-black rounded-md'>
        <div className='py-3 px-4 border-b-[1px] border-zinc-800'>
          <button type='button' onClick={handleClose}>
            <XIcon styleClassname='w-4 fill-zinc-700 hover:fill-zinc-800' />
          </button>
        </div>
        <div className='flex py-2 px-4 space-x-4'>
          <Avatar path={meData.user.avatar} />
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col py-3 space-y-2 w-11/12'>
            <input
              {...register('text', { required: true })}
              className='py-1 px-2 w-full bg-transparent border-b-2 border-zinc-700 outline-none'
              placeholder='What do you think this movie?'
              autoComplete='off'
              autoCapitalize='off'
            />
            <Vote handleVoteValue={handleVoteValue} voteValue={voteValue} />
            <input {...register('vote', { min: 0, max: 5, valueAsNumber: true })} className='hidden' />
            <button type='submit' className='py-2 px-4 bg-red-700 rounded-full'>
              Comment
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PostForm
