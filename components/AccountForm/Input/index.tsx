import { UseFormRegisterReturn } from 'react-hook-form'

interface IProps {
  label: string
  type: 'email' | 'password' | 'number' | 'text'
  register: UseFormRegisterReturn
}

const styles = {
  fieldset: 'relative flex flex-col space-y-1 text-sm font-semibold',
  input: 'py-2 pl-3 pr-7 bg-zinc-900/80 rounded-md outline-none',
}

const Input = ({ label, type, register }: IProps) => {
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
    </fieldset>
  )
}

export default Input
