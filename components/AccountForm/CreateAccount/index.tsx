import FormError from '../FormError'
import { IResponse } from '@libs/withHandler'
import { createAccount } from '@services/users.service'
import dynamic from 'next/dynamic'
import { useMutation } from 'react-query'
import { useState } from 'react'

import { SubmitHandler, useForm } from 'react-hook-form'

const Input = dynamic(() => import('../Input'), { ssr: false })
const SubmitButton = dynamic(() => import('../SubmitButton'), { ssr: false })

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
  container: 'space-y-2',
  button: 'py-2 w-full flex justify-center items-center text-sm bg-zinc-800 hover:bg-zinc-800/90 rounded-lg',
}

const CreateAccount = ({ inView, handleSetLogin }: IProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IForm>({ mode: 'onChange' })

  const [formError, setFormError] = useState<string | undefined>(undefined)

  const { mutate, isLoading } = useMutation(['createAccount'], createAccount, {
    onSuccess: ({ ok, error }: IResponse) => {
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
        emailError={errors.email?.type === 'pattern' || errors.email?.type === 'required' || !watch('email')}
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
      <SubmitButton isLoading={isLoading} />
      <FormError inView={!!formError} message={formError} />
    </form>
  )
}

export default CreateAccount
