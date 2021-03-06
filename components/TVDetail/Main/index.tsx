import { ITVDetail } from 'types/tv'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { getImage } from '@utils/getImage'

const FuncItems = dynamic(() => import('./FuncItems'), { ssr: false })

interface IProps {
  tv: ITVDetail
}

const styles = {
  wrapper: 'w-full h-full bg-black',
  container: 'flex relative justify-center w-screen h-screen',
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

const Main = ({ tv }: IProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {tv.backdrop_path && (
          <Image
            alt={`backdrop-${tv.name}`}
            className={styles.backgroundImage}
            layout='fill'
            src={getImage({ path: tv.backdrop_path as string, format: 'w1280' })}
            priority
          />
        )}
        <div className={styles.mainContainer}>
          <Image
            alt={`poster-${tv.name}`}
            width={400}
            height={450}
            src={getImage({ path: tv.poster_path as string, format: 'w780' })}
            className={styles.posterImage}
            priority
          />
          <div className={styles.subContainer}>
            <h3 className={styles.title}>
              {tv.name}
              {tv.first_air_date && <span className={styles.date}>({tv.first_air_date.split('-')[0]})</span>}
            </h3>
            <div className={styles.footWrapper}>
              <div>{tv.first_air_date}</div>
              <div className={styles.footContainer}>
                {tv.genres.map((genre, index) => {
                  const key = `${genre.id}-${index}-${genre.name}`
                  return <div key={key}>{genre.name}</div>
                })}
              </div>
              <div className={styles.footContainer}>{tv.episode_run_time}min</div>
            </div>
            <div className={styles.tagline}>{tv.tagline}</div>
            <div className={styles.overviewContainer}>
              <span>{tv.overview}</span>
            </div>
            <FuncItems tv={tv} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main
