import Image from 'next/image'
import dynamic from 'next/dynamic'
import { getImage } from '@utils/getImage'
import { useTv } from '@hooks/tv'

const FuncItems = dynamic(() => import('./FuncItems'), { ssr: false })

interface IProps {
  id: string
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

const Main = ({ id }: IProps) => {
  const { data } = useTv(id)
  if (!data) return null

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {data.backdrop_path && (
          <Image
            alt={`backdrop-${data.name}`}
            className={styles.backgroundImage}
            layout='fill'
            src={getImage({ path: data.backdrop_path as string, format: 'w1280' })}
            priority
          />
        )}
        <div className={styles.mainContainer}>
          <Image
            alt={`poster-${data.name}`}
            width={400}
            height={450}
            src={getImage({ path: data.poster_path as string, format: 'w780' })}
            className={styles.posterImage}
            priority
          />
          <div className={styles.subContainer}>
            <h3 className={styles.title}>
              {data.name}
              {data.first_air_date && <span className={styles.date}>({data.first_air_date.split('-')[0]})</span>}
            </h3>
            <div className={styles.footWrapper}>
              <div>{data.first_air_date}</div>
              <div className={styles.footContainer}>
                {data.genres.map((genre, index) => {
                  const key = `${genre.id}-${index}-${genre.name}`
                  return <div key={key}>{genre.name}</div>
                })}
              </div>
              <div className={styles.footContainer}>{data.episode_run_time}min</div>
            </div>
            <div className={styles.tagline}>{data.tagline}</div>
            <div className={styles.overviewContainer}>
              <span>{data.overview}</span>
            </div>
            <FuncItems tv={data} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main
