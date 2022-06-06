import { IMovie } from 'types/movie'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { getImage } from '@utils/getImage'
import { motion } from 'framer-motion'

const ReadMoreBtn = dynamic(() => import('@components/ReadMoreBtn'), { ssr: false })

interface IProps {
  movies: IMovie[]
  inView: boolean
}

const styles = {
  wrapper: 'relative min-w-[22rem] h-60',
  image: 'object-cover rounded-xl pointer-events-none',
  container: 'flex absolute bottom-0 justify-between items-end p-5 w-full bg-gradient-to-t from-black rounded-b-xl',
  subContainer: 'flex flex-col',
  name: 'text-lg font-semibold',
  date: 'text-sm',
  vote: 'text-xs font-semibold',
}

const DayList = ({ movies, inView }: IProps) => {
  if (!inView) return null
  return (
    <>
      {movies.map((movie, index) => {
        const key = `${movie.id}-${index}`
        if (!movie.backdrop_path) return null
        return (
          <motion.li
            layoutId={`movie-${movie.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={key}
            className={styles.wrapper}
          >
            <Image
              alt={movie.title}
              layout='fill'
              src={getImage({ path: movie.backdrop_path, format: 'w780' })}
              className={styles.image}
              priority
            />
            <motion.div className={styles.container}>
              <motion.div className={styles.subContainer}>
                <motion.span className={styles.name}>{movie.title}</motion.span>
                <motion.span className={styles.date}>{movie.release_date.split('-')[0]}</motion.span>
                <motion.span className={styles.vote}>{movie.vote_average} rating</motion.span>
              </motion.div>
              <motion.div>
                <ReadMoreBtn mediaType='movie' mediaId={movie.id} media={movie} />
              </motion.div>
            </motion.div>
          </motion.li>
        )
      })}
    </>
  )
}

export default DayList
