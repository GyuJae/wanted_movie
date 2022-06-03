import Image from 'next/image'
import dynamic from 'next/dynamic'
import { getImage } from '@utils/getImage'
import { motion } from 'framer-motion'
import { useMovies } from '@hooks/movie'

const Carousel = dynamic(() => import('@components/Carousel'))
const ReadMoreBtn = dynamic(() => import('@components/ReadMoreBtn'))

interface IProps {
  inView: boolean
}

const Movies = ({ inView }: IProps) => {
  const { data } = useMovies('now_playing')

  if (!inView || !data) return null

  return (
    <Carousel totalWidth={data.results.filter((movie) => !!movie.backdrop_path).length * 257}>
      {data.results.map((movie, index) => {
        const key = `${movie.id}-${index}`
        if (!movie.backdrop_path) return null
        return (
          <motion.div key={key} className='relative min-w-[19rem] h-48'>
            <Image
              alt={movie.title}
              layout='fill'
              src={getImage({ path: movie.backdrop_path, format: 'w780' })}
              className='object-cover rounded-xl pointer-events-none'
              priority
            />
            <motion.div className='flex absolute bottom-0 justify-between items-end p-5 w-full bg-gradient-to-t from-black rounded-b-xl'>
              <motion.div className='flex flex-col'>
                <motion.span className='text-base font-semibold'>{movie.title}</motion.span>
                <motion.span className='text-xs'>{movie.release_date.split('-')[0]}</motion.span>
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
