import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { tvDiscoveryState } from 'atoms/discoveryState'
import { useInfiniteTVs } from '@hooks/tv'
import { useRecoilValue } from 'recoil'

const TVPage = dynamic(() => import('./TVPage'), { ssr: false })
const NextPageBtn = dynamic(() => import('@components/NextPageBtn'), { ssr: false })

const styles = {
  wrapper: 'flex flex-col',
  container:
    'grid grid-cols-2 gap-4 justify-center py-4 pb-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6',
}

const TVList = () => {
  const cateogry = useRecoilValue(tvDiscoveryState)

  const { data, fetchNextPage, isFetching, hasNextPage } = useInfiniteTVs(cateogry)
  const handleFetch = () => {
    if (isFetching) return
    fetchNextPage()
  }

  if (!data) return null
  return (
    <div className={styles.wrapper}>
      <motion.ul layout className={styles.container}>
        {data.pages.map((page, index) => {
          const key = `tv-${cateogry}-${page.page}-${index}`
          return <TVPage key={key} tvPage={page} />
        })}
      </motion.ul>
      <NextPageBtn handleFetch={handleFetch} isFetching={isFetching} hasNextPage={hasNextPage} />
    </div>
  )
}

export default TVList
