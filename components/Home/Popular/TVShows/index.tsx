import Image from 'next/image'
import dynamic from 'next/dynamic'
import { getImage } from '@utils/getImage'
import { motion } from 'framer-motion'
import { useTvs } from '@hooks/tv'

const Carousel = dynamic(() => import('@components/Carousel'))
const ReadMoreBtn = dynamic(() => import('@components/ReadMoreBtn'))

interface IProps {
  inView: boolean
}

const TVShows = ({ inView }: IProps) => {
  const { data } = useTvs('popular')

  if (!inView || !data) return null

  return (
    <Carousel totalWidth={data.results.filter((tv) => !!tv.poster_path).length * 162}>
      {data.results.map((tv, index) => {
        const key = `${tv.id}-${index}`
        if (!tv.poster_path) return null
        return (
          <motion.div key={key} className='relative min-w-[13rem] min-h-[13rem]'>
            <Image
              alt={tv.name}
              layout='fill'
              src={getImage({ path: tv.poster_path, format: 'w500' })}
              className='object-cover object-top rounded-xl pointer-events-none'
              priority
            />
            <motion.div className='flex absolute bottom-0 justify-between items-end p-5 w-full bg-gradient-to-t from-black rounded-b-xl'>
              <motion.div className='flex flex-col mb-2'>
                <motion.span className='text-base font-semibold'>{tv.name}</motion.span>
                <motion.span className='text-xs'>{tv.first_air_date.split('-')[0]}</motion.span>
                <motion.div className='absolute right-2 bottom-2'>
                  <ReadMoreBtn mediaId={tv.id} mediaType='tv' media={tv} />
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )
      })}
    </Carousel>
  )
}

export default TVShows
