import FormError from '../FormError'
import { IResponse } from '@libs/withHandler'
import { createAccount } from '@services/users.service'
import dynamic from 'next/dynamic'
import { useMutation } from 'react-query'

import { SubmitHandler, useForm } from 'react-hook-form'
import { Suspense, useState } from 'react'

const Input = dynamic(() => import('../Input'))
const SpinLoading = dynamic(() => import('@components/Icons/SpinLoading'))

interface IProps {
  inView: boolean
  handleSetLogin: () => void
}

interface IForm {
  email: string
  username: string
  password: string
}

const CreateAccount = ({ inView, handleSetLogin }: IProps) => {
  const { register, handleSubmit } = useForm<IForm>()

  const [formError, setFormError] = useState<string | undefined>(undefined)

  const { mutate } = useMutation(['createAccount'], createAccount, {
    onSuccess: ({ ok, error }: IResponse) => {
      if (error) setFormError(error)
      if (ok) handleSetLogin()
    },
  })
  const onSubmit: SubmitHandler<IForm> = (data) => mutate(data)

  if (!inView) return null
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
      <Input
        label='Email'
        type='email'
        register={register('email', {
          required: true,
          pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        })}
      />
      <Input
        label='Username'
        type='text'
        register={register('username', {
          required: true,
          maxLength: 10,
        })}
      />
      <Input
        label='Password'
        type='password'
        register={register('password', {
          required: true,
          maxLength: 16,
        })}
      />
      <button type='submit' className='py-2 w-full text-sm bg-zinc-800 hover:bg-zinc-800/90 rounded-full'>
        <Suspense fallback={<SpinLoading />}>Sign Up</Suspense>
      </button>
      <FormError inView={Boolean(formError)} message={formError} />
    </form>
  )
}

export default CreateAccount
