import { UseFormRegisterReturn } from 'react-hook-form'

interface IProps {
  label: string
  type: 'email' | 'password' | 'number' | 'text'
  register: UseFormRegisterReturn
}

const Input = ({ label, type, register }: IProps) => {
  return (
    <fieldset className='flex flex-col space-y-2'>
      <label className='text-sm'>{label}</label>
      <input
        type={type}
        autoComplete='off'
        autoCapitalize='off'
        autoCorrect='off'
        {...register}
        className='p-1 bg-zinc-900 rounded-sm outline-none'
      />
    </fieldset>
  )
}

export default Input
