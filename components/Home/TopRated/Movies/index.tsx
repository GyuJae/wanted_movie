import { IMovieResult } from 'types/movie'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { getImage } from '@utils/getImage'
import { motion } from 'framer-motion'

const Carousel = dynamic(() => import('@components/Carousel'))
const StarIcon = dynamic(() => import('@components/Icons/StarIcon'))
const ReadMoreBtn = dynamic(() => import('@components/ReadMoreBtn'))

interface IProps {
  inView: boolean
  showStar?: boolean
  data?: IMovieResult
}

const styles = {
  wrapper: 'relative min-w-[13rem] min-h-[13rem]',
  image: 'object-cover object-top rounded-xl pointer-events-none',
  voteContainer: 'flex absolute top-2 left-4 justify-between items-center p-1 space-x-1 bg-black/80 rounded-2xl',
  starIcon: 'w-3 h-3 fill-yellow-500 mt-[1px]',
  vote: 'text-xs font-semibold',
  subWrapper: 'flex absolute bottom-0 justify-between items-end p-5 w-full bg-gradient-to-t from-black rounded-b-xl',
  subContainer: 'flex flex-col mb-2',
  title: 'text-base font-semibold',
  date: 'text-xs',
  readMoreBtnContainer: 'absolute right-2 bottom-2',
}

const Movies = ({ inView, showStar = true, data }: IProps) => {
  if (!inView || !data) return null

  return (
    <Carousel totalWidth={data.results.filter((movie) => !!movie.poster_path).length * 162}>
      {data.results.map((movie, index) => {
        const key = `${movie.id}-${index}`
        if (!movie.poster_path) return null
        return (
          <motion.div key={key} className={styles.wrapper}>
            <Image
              alt={movie.title}
              layout='fill'
              src={getImage({ path: movie.poster_path, format: 'w500' })}
              className={styles.image}
              priority
            />
            {showStar && (
              <motion.div className={styles.voteContainer}>
                <StarIcon styleClassName={styles.starIcon} />
                <span className={styles.vote}>{movie.vote_average}</span>
              </motion.div>
            )}
            <motion.div className={styles.subWrapper}>
              <motion.div className={styles.subContainer}>
                <motion.span className={styles.title}>{movie.title}</motion.span>
                {movie.release_date && (
                  <motion.span className={styles.date}>{movie.release_date.split('-')[0]}</motion.span>
                )}
                <motion.div className={styles.readMoreBtnContainer}>
                  <ReadMoreBtn mediaId={movie.id} mediaType='movie' media={movie} />
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )
      })}
    </Carousel>
  )
}

export default Movies
