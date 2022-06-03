import dynamic from 'next/dynamic'

const Layout = dynamic(() => import('@components/Layout'))
const CategoryTitle = dynamic(() => import('@components/CategoryTitle'))
const RecentList = dynamic(() => import('./RecentList'))

const RecentView = () => {
  return (
    <Layout showHeader={false}>
      <div className='px-4 pb-10'>
        <CategoryTitle cateogoryName='Recent View' />
        <RecentList />
      </div>
    </Layout>
  )
}

export default RecentView
