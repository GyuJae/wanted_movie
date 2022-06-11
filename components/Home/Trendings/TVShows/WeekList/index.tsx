import { ITV } from 'types/tv'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { getImage } from '@utils/getImage'
import { motion } from 'framer-motion'

const ReadMoreBtn = dynamic(() => import('@components/ReadMoreBtn'), { ssr: false })

interface IProps {
  tvs: ITV[]
  inView: boolean
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

const WeekList = ({ tvs, inView }: IProps) => {
  if (!inView) return null
  return (
    <>
      {tvs.map((tv, index) => {
        const key = `${tv.id}-${index}`
        if (!tv.backdrop_path) return null
        return (
          <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={key} className={styles.wrapper}>
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
          </motion.li>
        )
      })}
    </>
  )
}

export default WeekList
