import { UseFormRegisterReturn } from 'react-hook-form'

interface IProps {
  label: string
  type: 'email' | 'password' | 'number' | 'text'
  register: UseFormRegisterReturn
}

const Input = ({ label, type, register }: IProps) => {
  return (
    <fieldset className='flex flex-col space-y-1'>
      <input
        id={label}
        type={type}
        autoComplete='off'
        autoCapitalize='off'
        autoCorrect='off'
        placeholder={label}
        {...register}
        className='p-1 px-3 bg-zinc-900/80 rounded-sm outline-none'
      />
    </fieldset>
  )
}

export default Input
