import { IResponse } from '@libs/withHandler'
import dynamic from 'next/dynamic'
import { login } from '@services/users.service'
import { useState } from 'react'

import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'

const Input = dynamic(() => import('../Input'), { ssr: false })
const FormError = dynamic(() => import('../FormError'), { ssr: false })
const SpinLoading = dynamic(() => import('@components/Icons/SpinLoading'), { ssr: false })

interface IProps {
  inView: boolean
  handleClose: () => void
}

interface IForm {
  email: string
  password: string
}

const styles = {
  container: 'space-y-3',
  button: 'py-2 w-full flex justify-center items-center text-sm bg-zinc-800 hover:bg-zinc-800/90 rounded-full',
}

const Login = ({ inView, handleClose }: IProps) => {
  const queryClient = useQueryClient()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({ mode: 'onChange' })
  const [formError, setFormError] = useState<string | undefined>(undefined)
  const { mutate, isLoading } = useMutation('login', login, {
    onSuccess: ({ ok, error }: IResponse) => {
      if (error) setFormError(error)
      if (ok) {
        queryClient.refetchQueries(['user', 'me'])
        queryClient.refetchQueries(['bookmark', 'last'])
        queryClient.refetchQueries(['recentView', 'last'])
        handleClose()
      }
    },
  })

  const onSubmit: SubmitHandler<IForm> = (input) => {
    mutate(input)
  }

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
        label='Password'
        type='password'
        register={register('password', {
          required: true,
        })}
      />
      <FormError inView={errors.password?.type === 'required'} message='Password Required' />
      <button type='submit' className={styles.button}>
        {isLoading ? <SpinLoading size='s' darkmode /> : 'Login'}
      </button>
      <FormError inView={Boolean(formError)} message={formError} />
    </form>
  )
}

export default Login
