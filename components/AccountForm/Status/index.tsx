interface IStatus {
  status: 'login' | 'createAccount'
  handleSetLogin: () => void
  handleSetCreateAccount: () => void
}

const styles = {
  wrapper: 'flex justify-center pb-5 text-sm text-zinc-400',
  container: 'flex flex-col',
  button: 'font-semibold text-red-700 hover:underline',
}

const Status = ({ status, handleSetLogin, handleSetCreateAccount }: IStatus) => {
  return (
    <div className={styles.wrapper}>
      {status === 'createAccount' && (
        <div className={styles.container}>
          <span>Already have an account?</span>
          <button type='button' onClick={handleSetLogin} className={styles.button}>
            Log in
          </button>
        </div>
      )}
      {status === 'login' && (
        <div className={styles.container}>
          <span>{`Don't have an account?`}</span>
          <button type='button' onClick={handleSetCreateAccount} className={styles.button}>
            create account
          </button>
        </div>
      )}
    </div>
  )
}

export default Status
