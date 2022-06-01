import ExclamationIcon from '@components/Icons/ExclamationIcon'
import Layout from '@components/Layout'
import RotateIcon from '@components/Icons/RotateIcon'

interface IProps {
  resetErrorBoundary: (...args: unknown[]) => void
}

const styles = {
  wrapper: 'flex flex-col items-center py-20 px-4 m-auto space-y-2 w-2/3 h-1/2 bg-zinc-900 rounded-xl',
  exclamationIcon: 'w-20 h-20 fill-zinc-700',
  container: 'flex flex-col items-center space-y-2',
  whoops: 'text-3xl font-semibold text-red-500',
  message: 'text-base text-zinc-400',
  btnContainer: 'flex justify-between items-center py-1 px-5 space-x-2 text-sm text-zinc-200 bg-red-800 rounded-3xl',
  rotateIcon: 'w-4 h-4 fill-zinc-200 mt-1',
}

const Error = ({ resetErrorBoundary }: IProps) => {
  return (
    <Layout title='Error' showHeader={false} showNav={false}>
      <div className={styles.wrapper}>
        <div>
          <ExclamationIcon styleClassName={styles.exclamationIcon} />
        </div>

        <div className={styles.container}>
          <span className={styles.whoops}>Whoops!</span>
          <span className={styles.message}>Something went wrong. try another way</span>
        </div>
        <button className={styles.btnContainer} type='button' onClick={() => resetErrorBoundary()}>
          <span>Try again</span>
          <RotateIcon styleClassName={styles.rotateIcon} />
        </button>
      </div>
    </Layout>
  )
}

export default Error
