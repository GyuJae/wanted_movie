import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { useLastBookmark } from '@hooks/bookmark'
import { useRouter } from 'next/router'

const RightArrowIcon = dynamic(() => import('@components/Icons/RightArrowIcon'))
const BookmarkItem = dynamic(() => import('./BookmarkItem'))
const Skeleton = dynamic(() => import('../Skeleton'))

const styles = {
  wrapper: 'space-y-2',
  container: 'flex justify-between items-center',
  categoryName: 'text-lg font-semibold',
  linkContainer: 'flex w-full items-center space-x-2',
  seeAll: 'text-sm text-zinc-500',
  rightIcon: 'w-2 mt-[2px] fill-zinc-500',
}

const Bookmark = () => {
  const { data } = useLastBookmark()
  const router = useRouter()

  const handleGoBookmarked = () => router.push('/me/bookmarked')

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h3 className={styles.categoryName}>Bookmarked</h3>
        <button type='button' onClick={handleGoBookmarked} className={styles.linkContainer}>
          <span className={styles.seeAll}>See all</span>
          <div>
            <RightArrowIcon styleClassname={styles.rightIcon} />
          </div>
        </button>
      </div>
      <Suspense fallback={<Skeleton />}>
        {data && <BookmarkItem inView={data.ok} bookmarked={data.bookmark} />}
      </Suspense>
    </div>
  )
}

export default Bookmark
