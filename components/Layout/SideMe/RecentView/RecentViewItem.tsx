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

const RecentViewItem = ({ inView, recentView }: IProps) => {
  if (!inView || !recentView) return <div>Not Yet</div>
  return (
    <div className={styles.wrapper}>
      <Image
        alt={recentView.title}
        layout='fill'
        src={getImage({ path: recentView.posterPath, format: 'w500' })}
        className={styles.image}
        priority
      />
      <div className={styles.starIconContainer}>
        <StarIcon styleClassName={styles.starIcon} />
        <span className={styles.vote}>{recentView.vote}</span>
      </div>
      <div className={styles.container}>
        <div className={styles.subContainer}>
          <span className={styles.title}>{recentView.title}</span>
          <span className={styles.releaseDate}>{recentView.releaseDate.split('-')[0]}</span>
          <div className={styles.readMoreBtnContainer}>
            <ReadMoreBtn mediaId={recentView.mediaId} mediaType={recentView.mediaType} media={recentView} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecentViewItem
