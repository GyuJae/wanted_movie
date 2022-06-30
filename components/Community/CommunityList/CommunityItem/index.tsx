import Image from 'next/image'
import { PostWithUserAndCount } from 'types/post'
import dynamic from 'next/dynamic'
import { getImage } from '@utils/getImage'
import { useRouter } from 'next/router'

interface IProps {
  post: PostWithUserAndCount
}

const Avatar = dynamic(() => import('@components/Avatar'), { ssr: false })
const Vote = dynamic(() => import('./Vote'), { ssr: false })
const Count = dynamic(() => import('./Count'), { ssr: false })

const styles = {
  wrapper: 'flex flex-col py-2',
  contentContainer: 'flex justify-between',
  container: 'w-full space-y-1',
  itemContainer: 'flex items-center space-x-2',
  username: 'text-sm text-zinc-400',
  mediaType: 'text-xs text-zinc-500',
  textContainer: 'py-5 w-full text-left',
  text: 'text-zinc-300',
  imageContainer: 'relative mt-2 w-[5.5rem] h-[8rem]',
  image: 'object-cover object-top rounded-sm',
}

const CommunityItem = ({ post }: IProps) => {
  const router = useRouter()
  const handleClickMovie = () => router.push(`/${post.mediaType}/${post.mediaId}`)

  const handleClickPost = () => router.push(`/community/${post.id}`)

  return (
    <li className={styles.wrapper}>
      <div className={styles.contentContainer}>
        <div className={styles.container}>
          <div className={styles.itemContainer}>
            <Avatar path={post.user.avatar} size='small' />
            <span className={styles.username}>{post.user.username}</span>
          </div>
          <button type='button' onClick={handleClickMovie} className={styles.itemContainer}>
            <span>{post.mediaTitle}</span>
            <span className={styles.mediaType}> - {post.mediaType.toUpperCase()}</span>
          </button>
          <Vote vote={post.vote} />
          <button type='button' onClick={handleClickPost} className={styles.textContainer}>
            <span className={styles.text}>{post.text}</span>
          </button>
        </div>
        <button type='button' onClick={handleClickMovie} className={styles.imageContainer}>
          <Image
            src={getImage({ path: post.posterPath, format: 'w300' })}
            layout='fill'
            alt={post.mediaTitle}
            className={styles.image}
          />
        </button>
      </div>
      <Count post={post} />
    </li>
  )
}

export default CommunityItem
