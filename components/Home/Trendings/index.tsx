import Image from 'next/image'
import dynamic from 'next/dynamic'
import { getImage } from '@utils/getImage'
import { mediaTypeState } from 'atoms/mediaTypeState'
import { motion } from 'framer-motion'
import { useRecoilValue } from 'recoil'
import { useTrendings } from '@hooks/trending'

const Carousel = dynamic(() => import('@components/Carousel'))

const Trendings = () => {
  const mediaType = useRecoilValue(mediaTypeState)
  const { data } = useTrendings(mediaType, 'day')

  return (
    <div className='space-y-4 min-w-[1200px]'>
      <h3 className='text-lg font-semibold'>Trending movies</h3>
      <Carousel>
        {data?.results &&
          data.results.map((trending) => (
            <motion.div key={trending.id} className='relative min-w-[22rem] h-64 pointer-events-none '>
              <Image
                alt={trending.title}
                layout='fill'
                src={getImage({ path: trending.backdrop_path, format: 'w500' })}
                className='rounded-xl'
                priority
              />
            </motion.div>
          ))}
      </Carousel>
    </div>
  )
}

export default Trendings
