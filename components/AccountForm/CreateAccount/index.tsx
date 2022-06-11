import FormError from '../FormError'
import { IResponse } from '@libs/withHandler'
import { createAccount } from '@services/users.service'
import dynamic from 'next/dynamic'
import { useMutation } from 'react-query'
import { useState } from 'react'

import { SubmitHandler, useForm } from 'react-hook-form'

const Input = dynamic(() => import('../Input'), { ssr: false })
const EmailInput = dynamic(() => import('../Input/EmailInput'), { ssr: false })
const PasswordInput = dynamic(() => import('../Input/PasswordInput'), { ssr: false })
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
  inputContainer: 'space-y-1',
}

const CreateAccount = ({ inView, handleSetLogin }: IProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
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
      <div className={styles.inputContainer}>
        <EmailInput
          label='Email'
          register={register('email', {
            required: true,
            pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
          })}
          emailError={errors.email?.type === 'pattern' || errors.email?.type === 'required' || !watch('email')}
        />
        <FormError inView={errors.email?.type === 'required'} message='Email Required' />
        <FormError inView={errors.email?.type === 'pattern'} message='This is not email pattern' />
      </div>
      <div className={styles.inputContainer}>
        <Input
          label='Username'
          type='text'
          register={register('username', {
            required: true,
            maxLength: 10,
          })}
        />
        <FormError inView={errors.username?.type === 'required'} message='Username Required' />
        <FormError inView={errors.username?.type === 'maxLength'} message='Maximum username length is 10' />
      </div>
      <div className={styles.inputContainer}>
        <PasswordInput
          label='Password'
          register={register('password', {
            required: true,
            maxLength: 16,
          })}
        />
        <FormError inView={errors.password?.type === 'required'} message='Password Required' />
        <FormError inView={errors.password?.type === 'maxLength'} message='Maximum password length is 16' />
      </div>
      <div className={styles.inputContainer}>
        <SubmitButton isLoading={isLoading} isValid={isValid} status='create account' />
        <FormError inView={!!formError} message={formError} />
      </div>
    </form>
  )
}

export default CreateAccount
