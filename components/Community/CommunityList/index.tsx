import dynamic from 'next/dynamic'
import { usePosts } from '@hooks/post'

const CommunityItem = dynamic(() => import('./CommunityItem'), { ssr: false })

const styles = {
  wrapper: 'flex flex-col',
}

const CommunityList = () => {
  const { data } = usePosts()
  if (!data || !data.ok || !data.posts) return null
  return (
    <ul className={styles.wrapper}>
      {data.posts.map((post, index) => {
        const key = `post-${post.id}-${index}`
        return <CommunityItem key={key} post={post} />
      })}
    </ul>
  )
}

export default CommunityList
