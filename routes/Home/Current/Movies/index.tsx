import { IMovieResult } from 'types/movie'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { getImage } from '@utils/getImage'
import { getLeftDragConstraints } from '@utils/getLeftDragConstraints'
import { motion } from 'framer-motion'

const Carousel = dynamic(() => import('@components/Carousel'), { ssr: false })
const ReadMoreBtn = dynamic(() => import('@components/ReadMoreBtn'), { ssr: false })

interface IProps {
  inView: boolean
  data?: IMovieResult
}

const styles = {
  wrapper: 'relative min-w-[19rem] h-48',
  image: 'object-cover rounded-xl pointer-events-none',
  container: 'flex absolute bottom-0 justify-between items-end p-5 w-full bg-gradient-to-t from-black rounded-b-xl',
  subContainer: 'flex flex-col',
  title: 'text-base font-semibold',
  date: 'text-xs',
}

const Movies = ({ inView, data }: IProps) => {
  if (!inView || !data) return null

  const count = data.results.filter((movie) => !!movie.backdrop_path).length
  return (
    <Carousel totalWidth={getLeftDragConstraints({ count, type: 'medium' })}>
      {data.results.map((movie, index) => {
        const key = `${movie.id}-${index}`
        if (!movie.backdrop_path) return null
        return (
          <motion.div key={key} className={styles.wrapper}>
            <Image
              alt={movie.title}
              layout='fill'
              src={getImage({ path: movie.backdrop_path, format: 'w780' })}
              className={styles.image}
              priority
            />
            <motion.div className={styles.container}>
              <motion.div className={styles.subContainer}>
                <motion.span className={styles.title}>{movie.title}</motion.span>
                {movie.release_date && (
                  <motion.span className={styles.date}>{movie.release_date.split('-')[0]}</motion.span>
                )}
              </motion.div>
              <ReadMoreBtn mediaId={movie.id} mediaType='movie' media={movie} />
            </motion.div>
          </motion.div>
        )
      })}
    </Carousel>
  )
}

export default Movies
