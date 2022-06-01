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
              className='relative min-w-[22rem] h-60'
            >
              <Image
                alt={tv.name}
                layout='fill'
                src={getImage({ path: tv.backdrop_path, format: 'w780' })}
                className='object-cover rounded-xl pointer-events-none'
                priority
              />
              <motion.div className='flex absolute bottom-0 justify-between items-end p-5 w-full bg-gradient-to-t from-black rounded-b-xl'>
                <motion.div className='flex flex-col'>
                  <motion.span className='text-lg font-semibold'>{tv.name}</motion.span>
                  <motion.span className='text-sm'>{tv.first_air_date.split('-')[0]}</motion.span>
                  <motion.span className='text-xs font-semibold'>{tv.vote_average} rating</motion.span>
                </motion.div>
                <motion.div>
                  <ReadMoreBtn mediaType='tv' mediaId={tv.id} />
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
