import { ICast } from 'types/movie'
import Image from 'next/image'
import React from 'react'
import { getImage } from '@utils/getImage'

interface IProps {
  cast: ICast
}

const CastItem = ({ cast }: IProps) => {
  return (
    <div>
      <div className='relative w-44 h-48 bg-zinc-700 rounded-t-md pointer-events-none'>
        {cast.profile_path && (
          <Image
            alt={cast.name}
            src={getImage({ path: cast.profile_path, format: 'w500' })}
            layout='fill'
            className='rounded-t-md'
          />
        )}
      </div>
      <div className='flex flex-col'>
        <span className='font-semibold'>{cast.name}</span>
        <span className='text-xs font-light'>{cast.character}</span>
      </div>
    </div>
  )
}

export default CastItem
