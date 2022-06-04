import Image from 'next/image'
import { PostWithUser } from 'types/post'
import dynamic from 'next/dynamic'
import { getImage } from '@utils/getImage'
import { useRouter } from 'next/router'

interface IProps {
  post: PostWithUser
}

const Avatar = dynamic(() => import('@components/Avatar'), { ssr: false })
const Vote = dynamic(() => import('./Vote'), { ssr: false })

const styles = {
  wrapper: 'flex justify-between py-2 px-4 space-x-2',
  container: 'space-y-1',
  itemContainer: 'flex items-center space-x-2',
  username: 'text-sm text-zinc-400',
  mediaType: 'text-xs text-zinc-500',
  textContainer: 'py-5',
  text: 'text-zinc-300',
  imageContainer: 'relative mt-2 w-[5.5rem] h-[8rem]',
  image: 'object-cover object-top rounded-sm',
}

const CommunityItem = ({ post }: IProps) => {
  const router = useRouter()
  const handleClickMovie = () => router.push(`/${post.mediaType}/${post.mediaId}`)
  return (
    <li className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.itemContainer}>
          <Avatar path={post.user.avatar} size='small' />
          <span className={styles.username}>{post.user.username}</span>
        </div>
        <div className={styles.itemContainer}>
          <span>{post.mediaTitle}</span>
          <span className={styles.mediaType}> - {post.mediaType.toUpperCase()}</span>
        </div>
        <Vote vote={post.vote} />
        <div className={styles.textContainer}>
          <span className={styles.text}>{post.text}</span>
        </div>
      </div>
      <button type='button' onClick={handleClickMovie} className={styles.imageContainer}>
        <Image
          src={getImage({ path: post.posterPath, format: 'w300' })}
          layout='fill'
          alt={post.mediaTitle}
          className={styles.image}
        />
      </button>
    </li>
  )
}

export default CommunityItem
