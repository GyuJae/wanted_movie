import Image from 'next/image'
import { RecentView } from '@prisma/client'
import dynamic from 'next/dynamic'
import { getImage } from '@utils/getImage'

const StarIcon = dynamic(() => import('@components/Icons/StarIcon'))
const ReadMoreBtn = dynamic(() => import('@components/ReadMoreBtn'))

interface IProps {
  inView: boolean
  recentView?: RecentView | null
}
const RecentViewItem = ({ inView, recentView }: IProps) => {
  if (!inView || !recentView) return <div>Not Yet</div>
  return (
    <div className='relative min-w-[13rem] min-h-[13rem]'>
      <Image
        alt={recentView.title}
        layout='fill'
        src={getImage({ path: recentView.posterPath, format: 'w500' })}
        className='object-cover object-top rounded-xl pointer-events-none'
        priority
      />
      <div className='flex absolute top-2 left-4 justify-between items-center p-1 space-x-1 bg-black/80 rounded-2xl'>
        <StarIcon styleClassName='w-3 h-3 fill-yellow-500 mt-[1px]  ' />
        <span className='text-xs font-semibold'>{recentView.vote}</span>
      </div>
      <div className='flex absolute bottom-0 justify-between items-end p-5 w-full bg-gradient-to-t from-black rounded-b-xl'>
        <div className='flex flex-col mb-2'>
          <span className='text-base font-semibold'>{recentView.title}</span>
          <span className='text-xs'>{recentView.releaseDate.split('-')[0]}</span>
          <div className='absolute right-2 bottom-2'>
            <ReadMoreBtn mediaId={recentView.mediaId} mediaType={recentView.mediaType} media={recentView} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecentViewItem
