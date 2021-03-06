import { PostWithUserAndCount } from 'types/post'
import dynamic from 'next/dynamic'
import { useMe } from '@hooks/user'
import { useRouter } from 'next/router'

const Layout = dynamic(() => import('@components/Layout'), { ssr: false })
const CategoryTitle = dynamic(() => import('@components/CategoryTitle'), { ssr: false })
const CommunityList = dynamic(() => import('./CommunityList'), { ssr: false })

interface IProps {
  posts?: PostWithUserAndCount[]
}

const styles = {
  wrapper: 'px-4 space-y-4',
}

const Community = ({ posts }: IProps) => {
  const router = useRouter()
  const { data } = useMe()
  if (!data || !data.ok) router.replace('/')
  return (
    <Layout showHeader={false}>
      <div className={styles.wrapper}>
        <CategoryTitle cateogoryName='Community' />
        <CommunityList posts={posts} />
      </div>
    </Layout>
  )
}

export default Community
