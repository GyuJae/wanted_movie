interface IProps {
  message?: string
  inView: boolean
}

const styles = {
  error: 'flex justify-center items-center py-1 w-full text-sm font-semibold text-red-700',
}

const Error = ({ inView, message }: IProps) => {
  if (!inView || !message) return null
  return (
    <div className={styles.error}>
      <span>{message}</span>
    </div>
  )
}

export default Error
