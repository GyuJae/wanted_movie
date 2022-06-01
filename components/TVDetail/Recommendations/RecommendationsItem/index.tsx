import { ITV } from 'types/tv'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { getImage } from '@utils/getImage'

const ReadMoreBtn = dynamic(() => import('@components/ReadMoreBtn'))

interface IProps {
  tv: ITV
}

const styles = {
  wrapper: 'relative min-w-[19rem] h-48',
  image: 'object-cover rounded-xl pointer-events-none',
  container: 'flex absolute bottom-0 justify-between items-end p-5 w-full bg-gradient-to-t from-black rounded-b-xl',
  subContainer: 'flex flex-col',
  name: 'text-base font-semibold',
  date: 'text-xs',
}

const RecommendationsItem = ({ tv }: IProps) => {
  if (!tv.backdrop_path) return null
  return (
    <div className={styles.wrapper}>
      <Image
        alt={tv.name}
        layout='fill'
        src={getImage({ path: tv.backdrop_path, format: 'w780' })}
        className={styles.image}
        priority
      />
      <div className={styles.container}>
        <div className={styles.subContainer}>
          <span className={styles.name}>{tv.name}</span>
          <span className={styles.date}>{tv.first_air_date.split('-')[0]}</span>
        </div>
        <ReadMoreBtn mediaId={tv.id} mediaType='tv' />
      </div>
    </div>
  )
}

export default RecommendationsItem
