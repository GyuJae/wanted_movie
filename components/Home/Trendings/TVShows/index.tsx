import { ITV } from 'types/tv'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { getImage } from '@utils/getImage'

import { AnimatePresence, motion } from 'framer-motion'

const Carousel = dynamic(() => import('@components/Carousel'))
const ReadMoreBtn = dynamic(() => import('@components/ReadMoreBtn'))

interface IProps {
  inView: boolean
  tvs: ITV[]
}

const styles = {
  wrapper: 'relative min-w-[22rem] h-60',
  image: 'object-cover rounded-xl pointer-events-none',
  container: 'flex absolute bottom-0 justify-between items-end p-5 w-full bg-gradient-to-t from-black rounded-b-xl',
  subContainer: 'flex flex-col',
  name: 'text-lg font-semibold',
  date: 'text-sm',
  vote: 'text-xs font-semibold',
}

const TVShows = ({ inView, tvs }: IProps) => {
  if (!inView) return null

  return (
    <Carousel totalWidth={tvs.filter((tv) => !!tv.backdrop_path).length * 305}>
      <AnimatePresence>
        {tvs.map((tv, index) => {
          const key = `${tv.id}-${index}`
          if (!tv.backdrop_path) return null
          return (
            <motion.div
              layoutId={`tv-${tv.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key={key}
              className={styles.wrapper}
            >
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
                  <motion.span className={styles.date}>{tv.first_air_date.split('-')[0]}</motion.span>
                  <motion.span className={styles.vote}>{tv.vote_average} rating</motion.span>
                </motion.div>
                <motion.div>
                  <ReadMoreBtn mediaType='tv' mediaId={tv.id} media={tv} />
                </motion.div>
              </motion.div>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </Carousel>
  )
}

export default TVShows
