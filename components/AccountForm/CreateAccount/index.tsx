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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>()

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
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col py-10 px-4 space-y-2 '>
      <Input
        label='Email'
        type='email'
        register={register('email', {
          required: true,
          pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        })}
      />
      <FormError inView={Boolean(errors.email)} message={errors.email?.message} />
      <Input
        label='Username'
        type='text'
        register={register('username', {
          required: true,
          maxLength: 10,
        })}
      />
      <FormError inView={Boolean(errors.username)} message={errors.username?.message} />
      <Input
        label='Password'
        type='password'
        register={register('password', {
          required: true,
          maxLength: 16,
        })}
      />
      <FormError inView={Boolean(errors.password)} message={errors.password?.message} />
      <button type='submit' className='py-2 text-sm bg-zinc-800 hover:bg-zinc-800/90 rounded-sm'>
        <Suspense fallback={<SpinLoading />}>Create Account</Suspense>
      </button>
      <FormError inView={Boolean(formError)} message={formError} />
    </form>
  )
}

export default CreateAccount
