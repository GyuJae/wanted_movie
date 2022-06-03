/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { useLastRecentView } from '@hooks/recentView'

const RightArrowIcon = dynamic(() => import('@components/Icons/RightArrowIcon'))
const RecentViewItem = dynamic(() => import('./RecentViewItem'))
const Skeleton = dynamic(() => import('../Skeleton'))

const RecentView = () => {
  const { data } = useLastRecentView()

  return (
    <div className='space-y-2'>
      <div className='flex justify-between items-center'>
        <h3 className='text-lg font-semibold'>Recent View</h3>
        <Link href='/me/recent'>
          <a className='flex items-center space-x-2'>
            <span className='text-sm text-zinc-500'>See all</span>
            <div>
              <RightArrowIcon styleClassname='w-2 mt-[2px] fill-zinc-500' />
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
