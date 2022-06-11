import { PostWithUserAndCount } from 'types/post'
import dynamic from 'next/dynamic'

const CommunityItem = dynamic(() => import('./CommunityItem'), { ssr: false })

interface IProps {
  posts?: PostWithUserAndCount[]
}

const styles = {
  wrapper: 'flex flex-col',
}

const CommunityList = ({ posts }: IProps) => {
  if (!posts) return null
  return (
    <ul className={styles.wrapper}>
      {posts.map((post, index) => {
        const key = `post-${post.id}-${index}`
        return <CommunityItem key={key} post={post} />
      })}
    </ul>
  )
}

export default CommunityList
