import { IMovie } from 'types/movie'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { getImage } from '@utils/getImage'

const ReadMoreBtn = dynamic(() => import('@components/ReadMoreBtn'))

interface IProps {
  movie: IMovie
}

const RecommendationsItem = ({ movie }: IProps) => {
  if (!movie.backdrop_path) return null
  return (
    <div className='relative min-w-[19rem] h-48'>
      <Image
        alt={movie.title}
        layout='fill'
        src={getImage({ path: movie.backdrop_path, format: 'w780' })}
        className='object-cover rounded-xl pointer-events-none'
        priority
      />
      <div className='flex absolute bottom-0 justify-between items-end p-5 w-full bg-gradient-to-t from-black rounded-b-xl'>
        <div className='flex flex-col'>
          <span className='text-base font-semibold'>{movie.title}</span>
          <span className='text-xs'>{movie.release_date.split('-')[0]}</span>
        </div>
        <ReadMoreBtn mediaId={movie.id} mediaType='movie' />
      </div>
    </div>
  )
}

export default RecommendationsItem
