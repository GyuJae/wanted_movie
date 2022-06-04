import Image from 'next/image'
import { RecentView } from '@prisma/client'
import dynamic from 'next/dynamic'
import { getImage } from '@utils/getImage'
import { motion } from 'framer-motion'
import { showNavState } from '@atoms/showNavState'
import { useRecoilValue } from 'recoil'

const StarIcon = dynamic(() => import('@components/Icons/StarIcon'))
const ReadMoreBtn = dynamic(() => import('@components/ReadMoreBtn'))

interface IProps {
  recentView: RecentView
}

const styles = {
  wrapper: 'relative',
  image: 'object-cover rounded-md',
  voteContainer: 'flex absolute top-2 left-4 justify-between items-center p-1 space-x-1 bg-black/80 rounded-2xl',
  starIcon: 'w-3 h-3 fill-yellow-500 mt-[1px]',
  vote: 'text-xs font-semibold',
  subWrapper: 'flex absolute bottom-0 justify-between items-end p-5 w-full bg-gradient-to-t from-black rounded-b-xl',
  subContainer: 'flex flex-col mb-2',
  title: 'text-base font-semibold',
  date: 'text-xs',
  readMoreContainer: 'absolute right-2 bottom-2',
}

const RecentItem = ({ recentView }: IProps) => {
  const showNavValue = useRecoilValue(showNavState)
  return (
    <motion.div
      layoutId={`${recentView.id}-${recentView.title}`}
      animate={{
        width: showNavValue ? '11rem' : '12rem',
        height: showNavValue ? '16rem' : '18rem',
      }}
      className={styles.wrapper}
    >
      <Image
        alt={recentView.title}
        layout='fill'
        src={getImage({ path: recentView.posterPath, format: 'w500' })}
        className={styles.image}
        priority
      />
      <div className={styles.voteContainer}>
        <StarIcon styleClassName={styles.starIcon} />
        <span className={styles.vote}>{recentView.vote}</span>
      </div>
      <div className={styles.subWrapper}>
        <div className={styles.subContainer}>
          <span className={styles.title}>{recentView.title}</span>
          <span className={styles.date}>{recentView.releaseDate.split('-')[0]}</span>
          <div className={styles.readMoreContainer}>
            <ReadMoreBtn mediaId={recentView.mediaId} mediaType={recentView.mediaType} media={recentView} />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default RecentItem
