import { IMovie } from 'types/movie'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { getImage } from '@utils/getImage'
import { motion } from 'framer-motion'
import { showNavState } from 'atoms/showNavState'
import { useRecoilValue } from 'recoil'

const StarIcon = dynamic(() => import('@components/Icons/StarIcon'))
const ReadMoreBtn = dynamic(() => import('@components/ReadMoreBtn'))

interface IProps {
  movie: IMovie
}
const MovieItem = ({ movie }: IProps) => {
  const showNavValue = useRecoilValue(showNavState)
  if (!movie.poster_path) return null
  return (
    <motion.div
      layoutId={`${movie.id}-${movie.title}`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: 1,
        scale: 1,
        width: showNavValue ? '11rem' : '12rem',
        height: showNavValue ? '16rem' : '18rem',
      }}
      exit={{ opacity: 0 }}
      className='relative'
    >
      <Image
        alt={movie.title}
        layout='fill'
        src={getImage({ path: movie.poster_path, format: 'w500' })}
        className='object-cover rounded-md'
        priority
      />
      <div className='flex absolute top-2 left-4 justify-between items-center p-1 space-x-1 bg-black/80 rounded-2xl'>
        <StarIcon styleClassName='w-3 h-3 fill-yellow-500 mt-[1px]' />
        <span className='text-xs font-semibold'>{movie.vote_average}</span>
      </div>
      <div className='flex absolute bottom-0 justify-between items-end p-5 w-full bg-gradient-to-t from-black rounded-b-xl'>
        <div className='flex flex-col mb-2'>
          <span className='text-base font-semibold'>{movie.title}</span>
          <span className='text-xs'>{movie.release_date.split('-')[0]}</span>
          <div className='absolute right-2 bottom-2'>
            <ReadMoreBtn mediaId={movie.id} mediaType='movie' />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default MovieItem
