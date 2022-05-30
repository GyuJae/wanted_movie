import { IMovie } from 'types/movie'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { getImage } from '@utils/getImage'
import { motion } from 'framer-motion'

const Carousel = dynamic(() => import('@components/Carousel'))

interface IProps {
  inView: boolean
  movies: IMovie[]
}

const Movies = ({ inView, movies }: IProps) => {
  if (!inView) return null
  return (
    <Carousel totalWidth={movies.filter((movie) => !!movie.backdrop_path).length * 305}>
      {movies.map((movie, index) => {
        const key = `${movie.id}-${index}`
        if (!movie.backdrop_path) return null
        return (
          <motion.div key={key} className='relative w-[22rem] h-60'>
            <Image
              alt={movie.title}
              layout='fill'
              src={getImage({ path: movie.backdrop_path, format: 'w500' })}
              className='object-cover rounded-xl pointer-events-none'
              priority
            />
            <motion.div className='flex absolute bottom-0 justify-between items-end p-5 w-full bg-gradient-to-t from-black rounded-b-xl'>
              <motion.div className='flex flex-col'>
                <motion.span className='text-lg font-semibold'>{movie.title}</motion.span>
                <motion.span className='text-sm'>{movie.release_date.split('-')[0]}</motion.span>
                <motion.span className='text-xs font-semibold'>{movie.vote_average} rating</motion.span>
              </motion.div>
            </motion.div>
          </motion.div>
        )
      })}
    </Carousel>
  )
}

export default Movies
