import { ITV } from 'types/tv'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { getImage } from '@utils/getImage'

const ReadMoreBtn = dynamic(() => import('@components/ReadMoreBtn'))

interface IProps {
  tv: ITV
}

const SimilarItem = ({ tv }: IProps) => {
  if (!tv.backdrop_path) return null
  return (
    <div className='relative min-w-[19rem] h-48'>
      <Image
        alt={tv.name}
        layout='fill'
        src={getImage({ path: tv.backdrop_path, format: 'w780' })}
        className='object-cover rounded-xl pointer-events-none'
        priority
      />
      <div className='flex absolute bottom-0 justify-between items-end p-5 w-full bg-gradient-to-t from-black rounded-b-xl'>
        <div className='flex flex-col'>
          <span className='text-base font-semibold'>{tv.name}</span>
          <span className='text-xs'>{tv.first_air_date.split('-')[0]}</span>
        </div>
        <ReadMoreBtn mediaId={tv.id} mediaType='tv' />
      </div>
    </div>
  )
}

export default SimilarItem
