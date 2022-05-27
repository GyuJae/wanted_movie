import Image from 'next/image'
import { getImage } from '@utils/getImage'
import { mediaTypeState } from 'atoms/mediaTypeState'
import { useRecoilValue } from 'recoil'
import { useTrendings } from '@hooks/trending'

const Trendings = () => {
  const mediaType = useRecoilValue(mediaTypeState)
  const { data } = useTrendings(mediaType, 'day')

  return (
    <div className='space-y-4'>
      <h3 className='text-lg font-semibold'>Trending movies</h3>
      <div className='flex overflow-hidden overflow-x-scroll'>
        {data?.results &&
          data.results.map((trending) => (
            <div key={trending.id} className='relative w-96 h-60 bg-pink-400'>
              <Image
                alt={trending.title}
                layout='fill'
                src={getImage({ path: trending.backdrop_path, format: 'w500' })}
                priority
              />
            </div>
          ))}
      </div>
    </div>
  )
}

export default Trendings
