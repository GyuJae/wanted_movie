import { IResponse } from '@libs/withHandler'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { edit } from '@services/users.service'
import { fileToUrl } from '@utils/fileToUrl'
import { useClickAway } from 'react-use'
import { useMe } from '@hooks/user'

import { SubmitHandler, useForm } from 'react-hook-form'
import { useEffect, useRef, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'

const XIcon = dynamic(() => import('@components/Icons/XIcon'))
const CameraIcon = dynamic(() => import('@components/Icons/CameraIcon'))

interface IProps {
  inView: boolean
  handleCloseEditForm: () => void
}

interface IForm {
  username: string
  avatarFile?: FileList
}

const EditForm = ({ inView, handleCloseEditForm }: IProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const queryClient = useQueryClient()
  const [formError, setFormError] = useState<string | null>(null)
  const { data } = useMe()
  const { register, handleSubmit, setValue, watch } = useForm<IForm>()
  const { mutate } = useMutation(['user', 'me', 'edit'], edit, {
    onSuccess: ({ ok, error }: IResponse) => {
      if (ok) {
        queryClient.refetchQueries(['user', 'me'])
        handleCloseEditForm()
      }
      if (!ok && error) setFormError(error)
    },
  })

  const onSubmit: SubmitHandler<IForm> = async ({ username, avatarFile }) => {
    if (avatarFile && avatarFile.length > 0) {
      const { uploadURL } = await (await fetch('/api/files')).json()
      const form = new FormData()
      form.append('file', avatarFile[0], `${data?.user?.id}-avatar-${username}`)
      const {
        result: { id },
      } = await (
        await fetch(uploadURL, {
          method: 'POST',
          body: form,
        })
      ).json()
      mutate({ username, avatarId: id })
    } else {
      mutate({ username })
    }
  }

  useEffect(() => {
    if (data?.user?.username) setValue('username', data.user.username)
  }, [data?.user?.username, setValue])

  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    data?.user?.avatar ? fileToUrl({ path: data.user.avatar, variant: 'avatar' }) : null
  )
  const avatar = watch('avatarFile')
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0]
      setAvatarPreview(URL.createObjectURL(file))
    }
  }, [avatar])

  useClickAway(ref, handleCloseEditForm)

  if (!inView || !data || !data.ok) return null
  return (
    <div className='flex fixed top-0 left-0 z-30 justify-center items-center w-screen h-screen bg-zinc-900/90'>
      <div ref={ref} className='py-3 w-96 bg-black rounded-md'>
        <div className='px-4 pb-1 border-b-[1px] border-zinc-400'>
          <button type='button' onClick={handleCloseEditForm}>
            <XIcon styleClassname='w-4 fill-zinc-400 hover:fill-zinc-500' />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='py-2 px-4'>
          <fieldset>
            <label
              htmlFor='avatar'
              className='flex relative z-40 justify-center items-center py-2 w-full cursor-pointer'
            >
              {avatarPreview ? (
                <Image
                  src={avatarPreview}
                  alt='avatar'
                  width={120}
                  height={120}
                  className='rounded-full border-none outline-none'
                />
              ) : (
                <div className='w-32 h-32 bg-gray-500 rounded-full' />
              )}
              <div className='flex absolute justify-center items-center w-36 h-36 bg-black/80'>
                <CameraIcon styleClassname='w-4 fill-zinc-700 z-40' />
              </div>
            </label>
            <input id='avatar' type='file' accept='image/*' className='hidden' {...register('avatarFile')} />
          </fieldset>
          <fieldset>
            <label htmlFor='username' className='text-sm font-semibold'>
              Username
            </label>
            <input
              id='username'
              className='py-2 px-3 w-full bg-transparent border-b-2 border-zinc-600 outline-none'
              placeholder='Username'
              autoComplete='off'
              autoCapitalize='off'
              {...register('username', { required: true })}
            />
          </fieldset>
        </form>

        {formError && (
          <div className='px-4'>
            <span className='font-semibold text-red-600'>{formError}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default EditForm
