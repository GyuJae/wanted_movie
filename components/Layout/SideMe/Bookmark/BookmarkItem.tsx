import { Bookmark } from '@prisma/client'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { getImage } from '@utils/getImage'

const StarIcon = dynamic(() => import('@components/Icons/StarIcon'))
const ReadMoreBtn = dynamic(() => import('@components/ReadMoreBtn'))

interface IProps {
  inView: boolean
  bookmarked?: Bookmark | null
}
const BookmarkItem = ({ inView, bookmarked }: IProps) => {
  if (!inView || !bookmarked) return <div>Not Yet</div>
  return (
    <div className='relative min-w-[13rem] min-h-[13rem]'>
      <Image
        alt={bookmarked.title}
        layout='fill'
        src={getImage({ path: bookmarked.posterPath, format: 'w500' })}
        className='object-cover object-top rounded-xl pointer-events-none'
        priority
      />
      <div className='flex absolute top-2 left-4 justify-between items-center p-1 space-x-1 bg-black/80 rounded-2xl'>
        <StarIcon styleClassName='w-3 h-3 fill-yellow-500 mt-[1px]  ' />
        <span className='text-xs font-semibold'>{bookmarked.vote}</span>
      </div>
      <div className='flex absolute bottom-0 justify-between items-end p-5 w-full bg-gradient-to-t from-black rounded-b-xl'>
        <div className='flex flex-col mb-2'>
          <span className='text-base font-semibold'>{bookmarked.title}</span>
          <span className='text-xs'>{bookmarked.releaseDate.split('-')[0]}</span>
          <div className='absolute right-2 bottom-2'>
            <ReadMoreBtn mediaId={bookmarked.mediaId} mediaType={bookmarked.mediaType} media={bookmarked} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookmarkItem
