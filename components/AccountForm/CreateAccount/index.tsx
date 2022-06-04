import FormError from '../FormError'
import { IResponse } from '@libs/withHandler'
import { createAccount } from '@services/users.service'
import dynamic from 'next/dynamic'
import { useMutation } from 'react-query'

import { SubmitHandler, useForm } from 'react-hook-form'
import { Suspense, useState } from 'react'

const Input = dynamic(() => import('../Input'), { ssr: false })
const SpinLoading = dynamic(() => import('@components/Icons/SpinLoading'), { ssr: false })

interface IProps {
  inView: boolean
  handleSetLogin: () => void
}

interface IForm {
  email: string
  username: string
  password: string
}

const styles = {
  container: 'space-y-3',
  button: 'py-2 w-full text-sm bg-zinc-800 hover:bg-zinc-800/90 rounded-full',
}

const CreateAccount = ({ inView, handleSetLogin }: IProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({ mode: 'onChange' })

  const [formError, setFormError] = useState<string | undefined>(undefined)

  const { mutate } = useMutation(['createAccount'], createAccount, {
    onSuccess: ({ ok, error }: IResponse) => {
      console.log(ok, error)
      if (error) setFormError(error)
      if (ok) handleSetLogin()
    },
  })
  const onSubmit: SubmitHandler<IForm> = (data) => mutate(data)

  if (!inView) return null
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
      <Input
        label='Email'
        type='email'
        register={register('email', {
          required: true,
          pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        })}
      />
      <FormError inView={errors.email?.type === 'pattern'} message='This is not email pattern' />
      <FormError inView={errors.email?.type === 'required'} message='Email Required' />
      <Input
        label='Username'
        type='text'
        register={register('username', {
          required: true,
          maxLength: 10,
        })}
      />
      <FormError inView={errors.username?.type === 'required'} message='Username Required' />
      <FormError inView={errors.username?.type === 'maxLength'} message='Username Max Length 10' />
      <Input
        label='Password'
        type='password'
        register={register('password', {
          required: true,
          maxLength: 16,
        })}
      />
      <FormError inView={errors.password?.type === 'required'} message='Pssword Required' />
      <FormError inView={errors.password?.type === 'maxLength'} message='Pssword Max Length 16' />
      <button type='submit' className={styles.button}>
        <Suspense fallback={<SpinLoading />}>Sign Up</Suspense>
      </button>
      <FormError inView={!!formError} message={formError} />
    </form>
  )
}

export default CreateAccount
