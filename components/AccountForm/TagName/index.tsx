interface IProps {
  status: 'login' | 'createAccount'
}

const styles = {
  container: 'flex flex-col py-2 pb-6',
  name: 'text-xl font-semibold',
}

const TagName = ({ status }: IProps) => {
  const tagName = status === 'login' ? 'Log in' : 'Create Account'

  return (
    <div className={styles.container}>
      <span className={styles.name}>{tagName}</span>
    </div>
  )
}

export default TagName
