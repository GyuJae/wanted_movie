import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

const SpinLoading = dynamic(() => import('@components/Icons/SpinLoading'))

interface IProps {
  handleFetch: () => void
  isFetching: boolean
  hasNextPage?: boolean
}

const NextPageBtn = ({ handleFetch, isFetching, hasNextPage }: IProps) => {
  const { ref, inView } = useInView()

  useEffect(() => {
    if (!inView) return
    handleFetch()
  }, [handleFetch, inView])

  if (!hasNextPage) return null
  return (
    <div ref={ref} className='flex justify-center items-center py-2'>
      {isFetching ? <SpinLoading /> : null}
    </div>
  )
}

export default NextPageBtn
