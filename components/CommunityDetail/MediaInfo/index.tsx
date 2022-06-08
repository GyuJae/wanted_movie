import { IDetailPost } from 'types/post'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

interface IProps {
  post: IDetailPost
}

const Vote = dynamic(() => import('@components/Community/CommunityList/CommunityItem/Vote'), { ssr: false })

const styles = {
  wrapper: 'flex flex-col space-y-1',
  container: 'flex space-x-2 items-center',
  mediaType: 'text-xs text-zinc-500',
}

const MediaInfo = ({ post }: IProps) => {
  const router = useRouter()
  const handleClickMedia = () => router.push(`/${post.mediaType}/${post.mediaId}`)
  return (
    <button type='button' onClick={handleClickMedia} className={styles.wrapper}>
      <div className={styles.container}>
        <span>{post.mediaTitle}</span>
        <span>-</span>
        <span className={styles.mediaType}>{post.mediaType.toUpperCase()}</span>
      </div>
      <Vote vote={post.vote} />
    </button>
  )
}

export default MediaInfo
