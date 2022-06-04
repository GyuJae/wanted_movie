import dynamic from 'next/dynamic'

const Layout = dynamic(() => import('@components/Layout'))
const CategoryTitle = dynamic(() => import('@components/CategoryTitle'))
const BookmarkedList = dynamic(() => import('./BookmarkedList'))

const styles = {
  wrapper: 'px-4 pb-10',
}

const Bookmarked = () => {
  return (
    <Layout showHeader={false}>
      <div className={styles.wrapper}>
        <CategoryTitle cateogoryName='Bookmarked' />
        <BookmarkedList />
      </div>
    </Layout>
  )
}

export default Bookmarked
