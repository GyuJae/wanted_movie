import Image from 'next/image'
import StarIcon from '@components/Icons/StarIcon'
import dynamic from 'next/dynamic'
import { getImage } from '@utils/getImage'
import { motion } from 'framer-motion'
import { useMovies } from '@hooks/movie'

const Carousel = dynamic(() => import('@components/Carousel'))

interface IProps {
  inView: boolean
}

const Movies = ({ inView }: IProps) => {
  const { data } = useMovies('top_rated')

  if (!inView || !data) return null

  return (
    <Carousel totalWidth={data.results.filter((movie) => !!movie.poster_path).length * 162}>
      {data.results.map((movie, index) => {
        const key = `${movie.id}-${index}`
        if (!movie.poster_path) return null
        return (
          <motion.div key={key} className='relative w-52 h-52'>
            <Image
              alt={movie.title}
              layout='fill'
              src={getImage({ path: movie.poster_path, format: 'w500' })}
              className='object-cover rounded-xl pointer-events-none'
              priority
            />
            <motion.div className='flex absolute top-2 left-4 justify-between items-center p-1 space-x-1 bg-black/80 rounded-2xl'>
              <StarIcon styleClassName='w-3 h-3 fill-yellow-500 mt-[1px]  ' />
              <span className='text-xs font-semibold'>{movie.vote_average}</span>
            </motion.div>
            <motion.div className='flex absolute bottom-0 justify-between items-end p-5 w-full bg-gradient-to-t from-black rounded-b-xl'>
              <motion.div className='flex flex-col'>
                <motion.span className='text-base font-semibold'>{movie.title}</motion.span>
                <motion.span className='text-xs'>{movie.release_date.split('-')[0]}</motion.span>
              </motion.div>
            </motion.div>
          </motion.div>
        )
      })}
    </Carousel>
  )
}

export default Movies
