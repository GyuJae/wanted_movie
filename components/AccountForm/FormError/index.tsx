interface IProps {
  message?: string
  inView: boolean
}
const Error = ({ inView, message }: IProps) => {
  if (!inView || !message) return null
  return (
    <div className='flex justify-center items-center py-1 w-full text-sm font-semibold text-red-700'>
      <span>{message}</span>
    </div>
  )
}

export default Error
