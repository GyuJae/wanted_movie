import dynamic from 'next/dynamic'

const Layout = dynamic(() => import('@components/Layout'))
const CategoryTitle = dynamic(() => import('@components/CategoryTitle'))
const CommunityList = dynamic(() => import('./CommunityList'))

const styles = {
  wrapper: 'px-4 space-y-4',
}

const Community = () => {
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
