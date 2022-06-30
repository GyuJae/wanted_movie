import dynamic from 'next/dynamic'

const Layout = dynamic(() => import('@components/Layout'), { ssr: false })
const CategoryTitle = dynamic(() => import('@components/CategoryTitle'), { ssr: false })
const BookmarkedPage = dynamic(() => import('./BookmarkedPage'), { ssr: false })

const styles = {
  wrapper: 'px-4 pb-10',
}

const Bookmarked = () => {
  return (
    <Layout showHeader={false}>
      <div className={styles.wrapper}>
        <CategoryTitle cateogoryName='Bookmarked' />
        <BookmarkedPage />
      </div>
    </Layout>
  )
}

export default Bookmarked
