import { UseFormRegisterReturn } from 'react-hook-form'
import classNames from 'classnames'
import dynamic from 'next/dynamic'

const CheckIcon = dynamic(() => import('@components/Icons/CheckIcon'))

interface IProps {
  label: string
  register: UseFormRegisterReturn
  emailError: boolean
}

const styles = {
  fieldset: 'relative flex flex-col space-y-1 text-sm font-semibold',
  input: 'py-2 pl-3 pr-7 bg-zinc-900/80 rounded-md outline-none',
  iconContainer: (emailError: boolean) => classNames({ 'fill-red-700': !emailError, 'fill-zinc-700': emailError }),
  icon: 'w-4 absolute right-2 top-[2.1rem]',
}

const EmailInput = ({ label, register, emailError }: IProps) => {
  return (
    <fieldset className={styles.fieldset}>
      <label htmlFor={label}>{label}</label>
      <input
        id={label}
        type='email'
        autoComplete='off'
        autoCapitalize='off'
        autoCorrect='off'
        placeholder={label}
        {...register}
        className={styles.input}
      />
      <div className={styles.iconContainer(emailError)}>
        <CheckIcon styleClassname={styles.icon} />
      </div>
    </fieldset>
  )
}

export default EmailInput
