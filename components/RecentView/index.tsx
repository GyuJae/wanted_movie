import dynamic from 'next/dynamic'

const CategoryTitle = dynamic(() => import('@components/CategoryTitle'))
const Layout = dynamic(() => import('@components/Layout'))
const RecentViewPage = dynamic(() => import('./RecentViewPage'))

const RecentView = () => {
  return (
    <Layout showHeader={false}>
      <div className='px-4 pb-10'>
        <CategoryTitle cateogoryName='Recent View' />
        <RecentViewPage />
      </div>
    </Layout>
  )
}

export default RecentView
