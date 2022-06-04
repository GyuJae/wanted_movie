import dynamic from 'next/dynamic'
import { usePosts } from '@hooks/post'

const CommunityItem = dynamic(() => import('./CommunityItem'))

const CommunityList = () => {
  const { data } = usePosts()
  if (!data || !data.ok || !data.posts) return null
  return (
    <ul className='flex flex-col divide-y-[1px] divide-zinc-800'>
      {data.posts.map((post, index) => {
        const key = `post-${post.id}-${index}`
        return <CommunityItem key={key} post={post} />
      })}
    </ul>
  )
}

export default CommunityList
