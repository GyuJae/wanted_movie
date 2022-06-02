interface IStatus {
  status: 'login' | 'createAccount'
  handleSetLogin: () => void
  handleSetCreateAccount: () => void
}

const Status = ({ status, handleSetLogin, handleSetCreateAccount }: IStatus) => {
  return (
    <div className='flex justify-center pb-10'>
      {status === 'createAccount' && (
        <div className='flex space-x-2'>
          <span>Are you already registered? </span>
          <button type='button' onClick={handleSetLogin} className='text-sm hover:underline'>
            log in
          </button>
        </div>
      )}
      {status === 'login' && (
        <div className='flex space-x-2'>
          <span>Are you not registered?</span>
          <button type='button' onClick={handleSetCreateAccount} className='text-sm hover:underline'>
            create account
          </button>
        </div>
      )}
    </div>
  )
}

export default Status
