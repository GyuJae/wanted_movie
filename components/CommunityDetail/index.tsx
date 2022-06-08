import dynamic from 'next/dynamic'
import { useDetailPost } from '@hooks/post'

const DetailLayout = dynamic(() => import('@components/DetailLayout'), { ssr: false })
const UserInfo = dynamic(() => import('./UserInfo'), { ssr: false })

interface IProps {
  postId: string
}

const styles = {
  wrapper: 'px-20 pt-4 pb-16',
}

const CommunityDetail = ({ postId }: IProps) => {
  const { data } = useDetailPost({ postId: +postId })
  if (!data || !data.post) return null
  return (
    <DetailLayout>
      <div className={styles.wrapper}>
        <UserInfo writer={data?.post?.user} createdAt={data.post.createdAt} />
      </div>
    </DetailLayout>
  )
}

export default CommunityDetail
