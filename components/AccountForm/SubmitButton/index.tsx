import dynamic from 'next/dynamic'

const SpinLoading = dynamic(() => import('@components/Icons/SpinLoading'), { ssr: false })

interface IProps {
  isLoading: boolean
}

const styles = {
  button: 'py-2 w-full flex justify-center items-center text-sm bg-zinc-800 hover:bg-zinc-800/90 rounded-lg',
}

const SubmitButton = ({ isLoading }: IProps) => {
  return (
    <button type='submit' className={styles.button}>
      {isLoading ? <SpinLoading size='s' darkmode /> : 'Login'}
    </button>
  )
}

export default SubmitButton
