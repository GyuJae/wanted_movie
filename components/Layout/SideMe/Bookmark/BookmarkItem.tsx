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

const styles = {
  wrapper: 'relative min-w-[13rem] min-h-[13rem]',
  image: 'object-cover object-top rounded-xl pointer-events-none',
  starIconContainer: 'flex absolute top-2 left-4 justify-between items-center p-1 space-x-1 bg-black/80 rounded-2xl',
  starIcon: 'w-3 h-3 fill-yellow-500 mt-[1px]',
  vote: 'text-xs font-semibold',
  container: 'flex absolute bottom-0 justify-between items-end p-5 w-full bg-gradient-to-t from-black rounded-b-xl',
  subContainer: 'flex flex-col mb-2',
  title: 'text-base font-semibold',
  releaseDate: 'text-xs',
  readMoreBtnContainer: 'absolute right-2 bottom-2',
}

const BookmarkItem = ({ inView, bookmarked }: IProps) => {
  if (!inView || !bookmarked) return null
  return (
    <div className={styles.wrapper}>
      <Image
        alt={bookmarked.title}
        layout='fill'
        src={getImage({ path: bookmarked.posterPath, format: 'w500' })}
        className={styles.image}
        priority
      />
      <div className={styles.starIconContainer}>
        <StarIcon styleClassName={styles.starIcon} />
        <span className={styles.vote}>{bookmarked.vote}</span>
      </div>
      <div className={styles.container}>
        <div className={styles.subContainer}>
          <span className={styles.title}>{bookmarked.title}</span>
          <span className={styles.releaseDate}>{bookmarked.releaseDate.split('-')[0]}</span>
          <div className={styles.readMoreBtnContainer}>
            <ReadMoreBtn mediaId={bookmarked.mediaId} mediaType={bookmarked.mediaType} media={bookmarked} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookmarkItem
