/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { useLastBookmark } from '@hooks/bookmark'

const RightArrowIcon = dynamic(() => import('@components/Icons/RightArrowIcon'))
const BookmarkItem = dynamic(() => import('./BookmarkItem'))
const Skeleton = dynamic(() => import('../Skeleton'))

const styles = {
  wrapper: 'space-y-2',
  container: 'flex justify-between items-center',
  categoryName: 'text-lg font-semibold',
  linkContainer: 'flex items-center space-x-2',
  seeAll: 'text-sm text-zinc-500',
  rightIcon: 'w-2 mt-[2px] fill-zinc-500',
}

const Bookmark = () => {
  const { data } = useLastBookmark()

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h3 className={styles.categoryName}>Bookmarked</h3>
        <Link href='/me/bookmarked'>
          <a className={styles.linkContainer}>
            <span className={styles.seeAll}>See all</span>
            <div>
              <RightArrowIcon styleClassname={styles.rightIcon} />
            </div>
          </a>
        </Link>
      </div>
      <Suspense fallback={<Skeleton />}>
        {data && <BookmarkItem inView={data.ok} bookmarked={data.bookmark} />}
      </Suspense>
    </div>
  )
}

export default Bookmark
