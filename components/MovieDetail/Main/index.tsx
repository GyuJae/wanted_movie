import { IMovieDetail } from 'types/movie'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { getImage } from '@utils/getImage'

const FuncItems = dynamic(() => import('./FuncItems'), { ssr: false })

interface IProps {
  movie: IMovieDetail
}

const styles = {
  wrapper: 'w-full h-full bg-black',
  container: 'flex relative justify-center w-full h-screen',
  backgroundImage: 'object-fill opacity-30',
  mainContainer: 'flex justify-center py-9 space-x-4 w-full',
  posterImage: 'rounded-xl',
  subContainer: 'flex flex-col justify-end py-16 space-y-2',
  title: 'text-4xl font-semibold',
  date: 'text-3xl font-medium text-zinc-200',
  footWrapper: 'flex space-x-3',
  footContainer: 'flex space-x-2',
  tagline: 'font-semibold text-zinc-500 tagline',
  overviewContainer: 'w-[800px]',
}

const Main = ({ movie }: IProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {movie.backdrop_path && (
          <Image
            alt={`backdrop-${movie.title}`}
            className={styles.backgroundImage}
            layout='fill'
            src={getImage({ path: movie.backdrop_path as string, format: 'w1280' })}
            priority
          />
        )}
        <div className={styles.mainContainer}>
          <Image
            alt={`poster-${movie.title}`}
            width={400}
            height={450}
            src={getImage({ path: movie.poster_path as string, format: 'w780' })}
            className={styles.posterImage}
            priority
          />
          <div className={styles.subContainer}>
            <h3 className={styles.title}>
              {movie.title}
              <span className={styles.date}>({movie.release_date.split('-')[0]})</span>
            </h3>
            <div className={styles.footWrapper}>
              <div>{movie.release_date}</div>
              <div className={styles.footContainer}>
                {movie.genres.map((genre, index) => {
                  const key = `${genre.id}-${index}-${genre.name}`
                  return <div key={key}>{genre.name}</div>
                })}
              </div>
              <div className={styles.footContainer}>{movie.runtime}min</div>
            </div>
            <div className={styles.tagline}>{movie.tagline}</div>
            <div className={styles.overviewContainer}>
              <span>{movie.overview}</span>
            </div>
            <FuncItems movie={movie} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main
