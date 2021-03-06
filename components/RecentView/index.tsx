import dynamic from 'next/dynamic'

const CategoryTitle = dynamic(() => import('@components/CategoryTitle'), { ssr: false })
const Layout = dynamic(() => import('@components/Layout'), { ssr: false })
const RecentViewPage = dynamic(() => import('./RecentViewPage'), { ssr: false })

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
