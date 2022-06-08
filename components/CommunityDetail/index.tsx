import dynamic from 'next/dynamic'
import { useDetailPost } from '@hooks/post'

const DetailLayout = dynamic(() => import('@components/DetailLayout'), { ssr: false })
const UserInfo = dynamic(() => import('./UserInfo'), { ssr: false })
const MediaInfo = dynamic(() => import('./MediaInfo'), { ssr: false })
const TextInfo = dynamic(() => import('./TextInfo'), { ssr: false })
const Poster = dynamic(() => import('./Poster'), { ssr: false })

interface IProps {
  postId: string
}

const styles = {
  wrapper: 'relative px-10 pt-4 pb-16 space-y-2',
}

const CommunityDetail = ({ postId }: IProps) => {
  const { data } = useDetailPost({ postId: +postId })

  if (!data || !data.post) return null

  return (
    <DetailLayout>
      <div className={styles.wrapper}>
        <UserInfo writer={data?.post?.user} createdAt={data.post.createdAt} />
        <MediaInfo post={data.post} />
        <TextInfo post={data.post} />
        <Poster post={data.post} />
      </div>
    </DetailLayout>
  )
}

export default CommunityDetail
