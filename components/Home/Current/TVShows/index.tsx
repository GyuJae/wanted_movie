import Image from 'next/image'
import dynamic from 'next/dynamic'
import { getImage } from '@utils/getImage'
import { motion } from 'framer-motion'
import { useTvs } from '@hooks/tv'

const Carousel = dynamic(() => import('@components/Carousel'))

interface IProps {
  inView: boolean
}

const TVShows = ({ inView }: IProps) => {
  const { data } = useTvs('airing_today')

  if (!inView || !data) return null

  return (
    <Carousel totalWidth={data.results.filter((tv) => !!tv.backdrop_path).length * 255}>
      {data.results.map((tv, index) => {
        const key = `${tv.id}-${index}`
        if (!tv.backdrop_path) return null
        return (
          <motion.div key={key} className='relative w-[19rem] h-48'>
            <Image
              alt={tv.name}
              layout='fill'
              src={getImage({ path: tv.backdrop_path, format: 'w500' })}
              className='object-cover rounded-xl pointer-events-none'
              priority
            />
            <motion.div className='flex absolute bottom-0 justify-between items-end p-5 w-full bg-gradient-to-t from-black rounded-b-xl'>
              <motion.div className='flex flex-col'>
                <motion.span className='text-base font-semibold'>{tv.name}</motion.span>
                <motion.span className='text-xs'>{tv.first_air_date.split('-')[0]}</motion.span>
              </motion.div>
            </motion.div>
          </motion.div>
        )
      })}
    </Carousel>
  )
}

export default TVShows
