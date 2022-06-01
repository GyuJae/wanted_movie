import dynamic from 'next/dynamic'

const SpinLoading = dynamic(() => import('@components/Icons/SpinLoading'))

interface IProps {
  handleFetch: () => void
  isFetching: boolean
  hasNextPage?: boolean
}

const styles = {
  loadingContainer: 'flex justify-center items-center py-2',
  wrapper: 'flex justify-center items-center py-2 text-zinc-200 bg-red-700 hover:bg-red-700/90 rounded-md',
}

const NextPageBtn = ({ handleFetch, isFetching, hasNextPage }: IProps) => {
  const handleClickFetch = () => handleFetch()

  if (isFetching)
    return (
      <div className={styles.loadingContainer}>
        <SpinLoading />
      </div>
    )
  if (!hasNextPage) return null
  return (
    <div className={styles.wrapper}>
      <button type='button' onClick={handleClickFetch} className='w-full'>
        Show More
      </button>
    </div>
  )
}

export default NextPageBtn
