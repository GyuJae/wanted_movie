/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { useLastBookmark } from '@hooks/bookmark'

const RightArrowIcon = dynamic(() => import('@components/Icons/RightArrowIcon'))
const BookmarkItem = dynamic(() => import('./BookmarkItem'))
const Skeleton = dynamic(() => import('../Skeleton'))

const Bookmark = () => {
  const { data } = useLastBookmark()

  return (
    <div className='space-y-2'>
      <div className='flex justify-between items-center'>
        <h3 className='text-lg font-semibold'>Bookmarked</h3>
        <Link href='/me/bookmarked'>
          <a className='flex items-center space-x-2'>
            <span className='text-sm text-zinc-500'>See all</span>
            <div>
              <RightArrowIcon styleClassname='w-2 mt-[2px] fill-zinc-500' />
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
