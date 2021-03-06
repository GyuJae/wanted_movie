import { accountOpenState } from '@atoms/accountOpenState'
import { useSetRecoilState } from 'recoil'

interface IProps {
  inView: boolean
}

const styles = {
  button: 'py-1 px-3 text-sm text-zinc-200 hover:text-zinc-300',
}

const Login = ({ inView }: IProps) => {
  const setOpenLoginForm = useSetRecoilState(accountOpenState)

  const handleOpenLoginForm = () => setOpenLoginForm(true)
  if (!inView) return null
  return (
    <button type='button' onClick={handleOpenLoginForm} className={styles.button}>
      login
    </button>
  )
}

export default Login
