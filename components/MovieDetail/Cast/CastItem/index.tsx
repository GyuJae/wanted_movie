import { ICast } from 'types/movie'
import Image from 'next/image'
import React from 'react'
import { getImage } from '@utils/getImage'

interface IProps {
  cast: ICast
}

const styles = {
  imageContainer: 'relative min-w-[11rem] h-48 bg-zinc-700 rounded-t-md pointer-events-none',
  image: 'rounded-t-md',
  container: 'flex flex-col',
  name: 'font-semibold',
  character: 'text-xs font-light',
}

const CastItem = ({ cast }: IProps) => {
  return (
    <div>
      <div className={styles.imageContainer}>
        {cast.profile_path && (
          <Image
            alt={cast.name}
            src={getImage({ path: cast.profile_path, format: 'w500' })}
            layout='fill'
            className={styles.image}
          />
        )}
      </div>
      <div className={styles.container}>
        <span className={styles.name}>{cast.name}</span>
        <span className={styles.character}>{cast.character}</span>
      </div>
    </div>
  )
}

export default CastItem
