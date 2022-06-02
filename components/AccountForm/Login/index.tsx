import { IResponse } from '@libs/withHandler'
import dynamic from 'next/dynamic'
import { login } from '@services/users.service'
import { useMutation } from 'react-query'

import { SubmitHandler, useForm } from 'react-hook-form'
import { Suspense, useState } from 'react'

const Input = dynamic(() => import('../Input'))
const FormError = dynamic(() => import('../FormError'))
const SpinLoading = dynamic(() => import('@components/Icons/SpinLoading'))

interface IProps {
  inView: boolean
  handleClose: () => void
}

interface IForm {
  email: string
  password: string
}

const Login = ({ inView, handleClose }: IProps) => {
  const { register, handleSubmit } = useForm<IForm>({ mode: 'onBlur' })
  const [formError, setFormError] = useState<string | undefined>(undefined)
  const { mutate } = useMutation('login', login, {
    onSuccess: ({ ok, error }: IResponse) => {
      console.log(ok, error)
      if (error) setFormError(error)
      if (ok) handleClose()
    },
    onError: (e) => console.log('error', e),
  })

  const onSubmit: SubmitHandler<IForm> = (input) => {
    mutate(input)
  }

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
      <Input
        label='Password'
        type='password'
        register={register('password', {
          required: true,
        })}
      />
      <button type='submit' className='py-2 text-sm bg-zinc-800 hover:bg-zinc-800/90 rounded-sm'>
        <Suspense fallback={<SpinLoading />}>Login</Suspense>
      </button>
      <FormError inView={Boolean(formError)} message={formError} />
    </form>
  )
}

export default Login
