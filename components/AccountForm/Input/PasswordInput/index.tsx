import { UseFormRegisterReturn } from 'react-hook-form'
import classNames from 'classnames'
import dynamic from 'next/dynamic'
import { useState } from 'react'

const EyeIcon = dynamic(() => import('@components/Icons/EyeIcon'))
const EyeSlashIcon = dynamic(() => import('@components/Icons/EyeSlashIcon'))

interface IProps {
  label: string
  register: UseFormRegisterReturn
}

const styles = {
  fieldset: 'relative flex flex-col space-y-1 text-sm font-semibold',
  input: 'py-2 pl-3 pr-7 bg-zinc-900/80 rounded-md outline-none',
  iconContainer: (show: boolean) => classNames({ 'fill-red-700': show, 'fill-zinc-700': !show }),
  icon: 'w-4 absolute right-2 top-[2.1rem]',
}

const PasswordInput = ({ label, register }: IProps) => {
  const [show, setShow] = useState<boolean>(false)

  const handleToggleShow = () => setShow((prev) => !prev)

  const type = show ? 'text' : 'password'

  return (
    <fieldset className={styles.fieldset}>
      <label htmlFor={label}>{label}</label>
      <input
        id={label}
        type={type}
        autoComplete='off'
        autoCapitalize='off'
        autoCorrect='off'
        placeholder={label}
        {...register}
        className={styles.input}
      />
      <button className={styles.iconContainer(show)} type='button' onClick={handleToggleShow}>
        {show ? <EyeIcon styleClassname={styles.icon} /> : <EyeSlashIcon styleClassname={styles.icon} />}
      </button>
    </fieldset>
  )
}

export default PasswordInput
