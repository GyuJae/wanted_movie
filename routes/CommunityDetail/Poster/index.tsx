import { IDetailPost } from 'types/post'
import Image from 'next/image'
import React from 'react'
import { getImage } from '@utils/getImage'
import { useRouter } from 'next/router'

interface IProps {
  post: IDetailPost
}

const styles = {
  wrapper: 'absolute top-8 right-10',
  imageContainer: 'relative mt-2 w-[5.5rem] h-[8rem]',
  image: 'object-cover object-top rounded-sm',
}

const Poster = ({ post }: IProps) => {
  const router = useRouter()

  const handleClickMovie = () => router.push(`/${post.mediaType}/${post.mediaId}`)
  return (
    <div className={styles.wrapper}>
      <button type='button' onClick={handleClickMovie} className={styles.imageContainer}>
        <Image
          src={getImage({ path: post.posterPath, format: 'w300' })}
          layout='fill'
          alt={post.mediaTitle}
          className={styles.image}
        />
      </button>
    </div>
  )
}

export default Poster
