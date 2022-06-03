import { IMovie } from 'types/movie'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { getImage } from '@utils/getImage'

const ReadMoreBtn = dynamic(() => import('@components/ReadMoreBtn'))

interface IProps {
  movie: IMovie
}

const styles = {
  wrapper: 'relative min-w-[19rem] h-48',
  image: 'object-cover rounded-xl pointer-events-none',
  container: 'flex absolute bottom-0 justify-between items-end p-5 w-full bg-gradient-to-t from-black rounded-b-xl',
  subContainer: 'flex flex-col',
  title: 'text-base font-semibold',
  date: 'text-xs',
}

const SimilarItem = ({ movie }: IProps) => {
  if (!movie.backdrop_path) return null
  return (
    <div className={styles.wrapper}>
      <Image
        alt={movie.title}
        layout='fill'
        src={getImage({ path: movie.backdrop_path, format: 'w780' })}
        className={styles.image}
        priority
      />
      <div className={styles.container}>
        <div className={styles.subContainer}>
          <span className={styles.title}>{movie.title}</span>
          <span className={styles.date}>{movie.release_date.split('-')[0]}</span>
        </div>
        <ReadMoreBtn mediaId={movie.id} mediaType='movie' media={movie} />
      </div>
    </div>
  )
}

export default SimilarItem
