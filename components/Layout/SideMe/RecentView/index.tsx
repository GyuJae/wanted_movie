/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { useLastRecentView } from '@hooks/recentView'

const RightArrowIcon = dynamic(() => import('@components/Icons/RightArrowIcon'), { ssr: false })
const RecentViewItem = dynamic(() => import('./RecentViewItem'), { ssr: false })
const Skeleton = dynamic(() => import('../Skeleton'), { ssr: false })

const styles = {
  wrapper: 'space-y-2',
  container: 'flex justify-between items-center',
  categoryName: 'text-lg font-semibold',
  link: 'flex items-center space-x-2',
  seeAll: 'text-sm text-zinc-500',
  seeAllIcon: 'w-2 mt-[2px] fill-zinc-500',
}

const RecentView = () => {
  const { data } = useLastRecentView()
  if (!data || !data.recentView) return null
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h3 className={styles.categoryName}>Recent View</h3>
        <Link href='/me/recent'>
          <a className={styles.link}>
            <span className={styles.seeAll}>See all</span>
            <div>
              <RightArrowIcon styleClassname={styles.seeAllIcon} />
            </div>
          </a>
        </Link>
      </div>
      <Suspense fallback={<Skeleton />}>
        {data && <RecentViewItem inView={data.ok} recentView={data.recentView} />}
      </Suspense>
    </div>
  )
}

export default RecentView
