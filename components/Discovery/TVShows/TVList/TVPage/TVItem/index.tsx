import { ITV } from 'types/tv'
import Image from 'next/image'
import classNames from 'classnames'
import dynamic from 'next/dynamic'
import { getImage } from '@utils/getImage'
import { motion } from 'framer-motion'
import { showNavState } from 'atoms/showNavState'
import { useRecoilValue } from 'recoil'

const StarIcon = dynamic(() => import('@components/Icons/StarIcon'), { ssr: false })
const ReadMoreBtn = dynamic(() => import('@components/ReadMoreBtn'), { ssr: false })

interface IProps {
  tv: ITV
}

const styles = {
  wrapper: (showNavValue: boolean) =>
    classNames('relative', { 'w-[11rem] h-[16rem]': showNavValue, 'w-[12rem] h-[18rem]': !showNavValue }),
  image: 'object-cover rounded-md',
  voteContainer: 'flex absolute top-2 left-4 justify-between items-center p-1 space-x-1 bg-black/80 rounded-2xl',
  star: 'w-3 h-3 fill-yellow-500 mt-[1px]',
  vote: 'text-xs font-semibold',
  subWrapper: 'flex absolute bottom-0 justify-between items-end p-5 w-full bg-gradient-to-t from-black rounded-b-xl',
  subContainer: 'flex flex-col mb-2',
  name: 'text-base font-semibold',
  date: 'text-xs',
  readMoreBtnContainer: 'absolute right-2 bottom-2',
}

const TVItem = ({ tv }: IProps) => {
  const showNavValue = useRecoilValue(showNavState)

  if (!tv.poster_path) return null
  return (
    <motion.li
      layoutId={`${tv.id}-${tv.name}`}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
      }}
      exit={{ opacity: 0 }}
      className={styles.wrapper(showNavValue)}
    >
      <Image
        alt={tv.name}
        layout='fill'
        src={getImage({ path: tv.poster_path, format: 'w500' })}
        className={styles.image}
        priority
      />
      <div className={styles.voteContainer}>
        <StarIcon styleClassName={styles.star} />
        <span className={styles.vote}>{tv.vote_average}</span>
      </div>
      <div className={styles.subWrapper}>
        <div className={styles.subContainer}>
          <span className={styles.name}>{tv.name}</span>
          {tv.first_air_date && <span className={styles.date}>{tv.first_air_date.split('-')[0]}</span>}
          <div className={styles.readMoreBtnContainer}>
            <ReadMoreBtn mediaId={tv.id} mediaType='tv' media={tv} />
          </div>
        </div>
      </div>
    </motion.li>
  )
}

export default TVItem
