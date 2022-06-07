import dynamic from 'next/dynamic'
import { useLastRecentView } from '@hooks/recentView'
import { useRouter } from 'next/router'

const RightArrowIcon = dynamic(() => import('@components/Icons/RightArrowIcon'), { ssr: false })
const RecentViewItem = dynamic(() => import('./RecentViewItem'), { ssr: false })
const Skeleton = dynamic(() => import('../Skeleton'), { ssr: false })

const styles = {
  wrapper: 'space-y-2',
  container: 'flex justify-between items-center',
  categoryName: 'text-lg font-semibold',
  linkContainer: 'flex items-center space-x-2',
  seeAll: 'text-sm text-zinc-500',
  seeAllIcon: 'w-2 mt-[2px] fill-zinc-500',
}

const RecentView = () => {
  const router = useRouter()
  const { data, isLoading } = useLastRecentView()

  const handleGoRecentView = () => router.push('/me/recent')

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h3 className={styles.categoryName}>Recent View</h3>
        <button type='button' onClick={handleGoRecentView} className={styles.linkContainer}>
          <span className={styles.seeAll}>See all</span>
          <div>
            <RightArrowIcon styleClassname={styles.seeAllIcon} />
          </div>
        </button>
      </div>
      <Skeleton inView={isLoading} />
      <RecentViewItem inView={Boolean(data?.ok)} recentView={data?.recentView} />
    </div>
  )
}

export default RecentView
