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
  const { data } = useMovies('popular')

  if (!inView || !data) return null

  return (
    <Carousel totalWidth={data.results.filter((movie) => !!movie.poster_path).length * 162}>
      {data.results.map((movie, index) => {
        const key = `${movie.id}-${index}`
        if (!movie.poster_path) return null
        return (
          <motion.div key={key} className='relative min-w-[13rem] min-h-[13rem]'>
            <Image
              alt={movie.title}
              layout='fill'
              src={getImage({ path: movie.poster_path, format: 'w500' })}
              className='object-cover object-top rounded-xl pointer-events-none'
              priority
            />
            <motion.div className='flex absolute bottom-0 justify-between items-end p-5 w-full bg-gradient-to-t from-black rounded-b-xl'>
              <motion.div className='flex flex-col mb-2'>
                <motion.span className='text-base font-semibold'>{movie.title}</motion.span>
                <motion.span className='text-xs'>{movie.release_date.split('-')[0]}</motion.span>
                <motion.div className='absolute right-2 bottom-2'>
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
