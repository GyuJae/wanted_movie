import dynamic from 'next/dynamic'
import { useMe } from '@hooks/user'
import { useRouter } from 'next/router'

const Layout = dynamic(() => import('@components/Layout'), { ssr: false })
const CategoryTitle = dynamic(() => import('@components/CategoryTitle'), { ssr: false })
const CommunityList = dynamic(() => import('./CommunityList'), { ssr: false })

const styles = {
  wrapper: 'px-4 space-y-4',
}

const Community = () => {
  const router = useRouter()
  const { data } = useMe()
  if (!data || !data.ok) return router.replace('/')
  return (
    <Layout showHeader={false}>
      <div className={styles.wrapper}>
        <CategoryTitle cateogoryName='Community' />
        <CommunityList />
      </div>
    </Layout>
  )
}

export default Community
