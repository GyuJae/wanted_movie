import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'

const SpinLoading = dynamic(() => import('@components/Icons/SpinLoading'), { ssr: false })

interface IProps {
  handleFetch: () => void
  isFetching: boolean
  hasNextPage?: boolean
}

const styles = {
  loadingContainer: 'flex justify-center items-center py-2 bg-red-700 rounded-md',
  wrapper: 'flex justify-center items-center py-2 text-zinc-200 bg-red-700 hover:bg-red-700/90 rounded-md',
}

const NextPageBtn = ({ handleFetch, isFetching, hasNextPage }: IProps) => {
  const handleClickFetch = () => handleFetch()

  if (isFetching)
    return (
      <motion.div className={styles.loadingContainer}>
        <SpinLoading size='s' darkmode={false} backWhite />
      </motion.div>
    )
  if (!hasNextPage) return null
  return (
    <motion.div className={styles.wrapper}>
      <motion.button type='button' onClick={handleClickFetch} className='w-full'>
        Show More
      </motion.button>
    </motion.div>
  )
}

export default NextPageBtn
