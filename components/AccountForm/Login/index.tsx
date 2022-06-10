import { IResponse } from '@libs/withHandler'
import dynamic from 'next/dynamic'
import { login } from '@services/users.service'
import { useState } from 'react'

import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'

const EmailInput = dynamic(() => import('../Input/EmailInput'), { ssr: false })
const PasswordInput = dynamic(() => import('../Input/PasswordInput'), { ssr: false })
const FormError = dynamic(() => import('../FormError'), { ssr: false })
const SubmitButton = dynamic(() => import('../SubmitButton'), { ssr: false })

interface IProps {
  inView: boolean
  handleClose: () => void
}

interface IForm {
  email: string
  password: string
}

const styles = {
  container: 'space-y-2',
  inputContainer: 'space-y-1',
}

const Login = ({ inView, handleClose }: IProps) => {
  const queryClient = useQueryClient()
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
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
      <div className={styles.inputContainer}>
        <EmailInput
          label='Email'
          register={register('email', {
            required: true,
            pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
          })}
          emailError={errors.email?.type === 'pattern' || errors.email?.type === 'required' || !watch('email')}
        />
        <FormError inView={errors.email?.type === 'pattern'} message='This is not email pattern' />
        <FormError inView={errors.email?.type === 'required'} message='Email Required' />
      </div>
      <div className={styles.inputContainer}>
        <PasswordInput
          label='Password'
          register={register('password', {
            required: true,
          })}
        />
        <FormError inView={errors.password?.type === 'required'} message='Password Required' />
      </div>
      <div className={styles.inputContainer}>
        <SubmitButton isLoading={isLoading} isValid={isValid} />
        <FormError inView={!!formError} message={formError} />
      </div>
    </form>
  )
}

export default Login
