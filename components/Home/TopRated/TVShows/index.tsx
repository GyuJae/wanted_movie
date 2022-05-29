import Image from 'next/image'
import StarIcon from '@components/Icons/StarIcon'
import dynamic from 'next/dynamic'
import { getImage } from '@utils/getImage'
import { motion } from 'framer-motion'
import { useTvs } from '@hooks/tv'

const Carousel = dynamic(() => import('@components/Carousel'))

interface IProps {
  inView: boolean
}

const TVShows = ({ inView }: IProps) => {
  const { data } = useTvs('top_rated')

  if (!inView || !data) return null

  return (
    <Carousel totalWidth={data.results.length * 162}>
      {data.results.map((tv, index) => {
        const key = `${tv.id}-${index}`
        if (!tv.poster_path) return null
        return (
          <motion.div key={key} className='relative w-52 h-52'>
            <Image
              alt={tv.name}
              layout='fill'
              src={getImage({ path: tv.poster_path, format: 'w500' })}
              className='object-cover rounded-xl pointer-events-none'
              priority
            />
            <motion.div className='flex absolute top-2 left-4 justify-between items-center p-1 space-x-1 bg-black/80 rounded-2xl'>
              <StarIcon styleClassName='w-3 h-3 fill-yellow-500 mt-[1px]  ' />
              <span className='text-xs font-semibold'>{tv.vote_average}</span>
            </motion.div>
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
