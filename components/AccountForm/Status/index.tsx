interface IStatus {
  status: 'login' | 'createAccount'
  handleSetLogin: () => void
  handleSetCreateAccount: () => void
}

const styles = {
  wrapper: 'flex justify-center pb-10 text-sm text-zinc-400',
  container: 'flex space-x-2',
  button: 'font-semibold text-red-700 hover:underline',
}

const Status = ({ status, handleSetLogin, handleSetCreateAccount }: IStatus) => {
  return (
    <div className={styles.wrapper}>
      {status === 'createAccount' && (
        <div className={styles.container}>
          <span>Are you already sign up? </span>
          <button type='button' onClick={handleSetLogin} className={styles.button}>
            log in
          </button>
        </div>
      )}
      {status === 'login' && (
        <div className={styles.container}>
          <span>Not a member ?</span>
          <button type='button' onClick={handleSetCreateAccount} className={styles.button}>
            create account
          </button>
        </div>
      )}
    </div>
  )
}

export default Status
