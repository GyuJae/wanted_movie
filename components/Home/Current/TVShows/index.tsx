import { ITVResult } from 'types/tv'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { getImage } from '@utils/getImage'
import { motion } from 'framer-motion'

const Carousel = dynamic(() => import('@components/Carousel'))
const ReadMoreBtn = dynamic(() => import('@components/ReadMoreBtn'))

interface IProps {
  inView: boolean
  data?: ITVResult
}

const styles = {
  wrapper: 'relative min-w-[19rem] h-48',
  image: 'object-cover rounded-xl pointer-events-none',
  container: 'flex absolute bottom-0 justify-between items-end p-5 w-full bg-gradient-to-t from-black rounded-b-xl',
  subContainer: 'flex flex-col',
  name: 'text-base font-semibold',
  date: 'text-xs',
}

const TVShows = ({ inView, data }: IProps) => {
  if (!inView || !data) return null

  return (
    <Carousel totalWidth={data.results.filter((tv) => !!tv.backdrop_path).length * 255}>
      {data.results.map((tv, index) => {
        const key = `${tv.id}-${index}`
        if (!tv.backdrop_path) return null
        return (
          <motion.div key={key} className={styles.wrapper}>
            <Image
              alt={tv.name}
              layout='fill'
              src={getImage({ path: tv.backdrop_path, format: 'w780' })}
              className={styles.image}
              priority
            />
            <motion.div className={styles.container}>
              <motion.div className={styles.subContainer}>
                <motion.span className={styles.name}>{tv.name}</motion.span>
                {tv.first_air_date && (
                  <motion.span className={styles.date}>{tv.first_air_date.split('-')[0]}</motion.span>
                )}
              </motion.div>
              <ReadMoreBtn mediaId={tv.id} mediaType='tv' media={tv} />
            </motion.div>
          </motion.div>
        )
      })}
    </Carousel>
  )
}

export default TVShows
