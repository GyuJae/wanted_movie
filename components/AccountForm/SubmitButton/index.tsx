import classNames from 'classnames'
import dynamic from 'next/dynamic'

const SpinLoading = dynamic(() => import('@components/Icons/SpinLoading'), { ssr: false })

interface IProps {
  isLoading: boolean
  isValid: boolean
  status?: 'login' | 'create account'
}

const styles = {
  button: (validate: boolean) =>
    classNames('py-2 w-full flex justify-center items-center text-sm bg-zinc-800 rounded-lg', {
      'opacity-30': !validate,
      'hover:bg-zinc-800/90 ': validate,
    }),
}

const SubmitButton = ({ isLoading, isValid, status = 'login' }: IProps) => {
  const value = status === 'login' ? 'Login' : 'Create Account'

  return (
    <button type='submit' className={styles.button(isValid)}>
      {isLoading ? <SpinLoading size='s' darkmode /> : value}
    </button>
  )
}

export default SubmitButton
