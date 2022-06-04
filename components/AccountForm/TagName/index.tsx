interface IProps {
  status: 'login' | 'createAccount'
}
const TagName = ({ status }: IProps) => {
  return (
    <div className='flex flex-col py-2'>
      <span className='text-xl font-semibold'>{status === 'login' ? 'Login' : 'Create Account'}</span>
      {/* <span className='text-sm text-zinc-400'>
        {status === 'login' ? 'Enter your details to get sign in to your account' : 'Fill Your Details'}
      </span> */}
    </div>
  )
}

export default TagName
