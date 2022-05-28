import type { NextPage } from 'next'
import classNames from 'classnames'
import dynamic from 'next/dynamic'

const Layout = dynamic(() => import('@components/Layout'), { ssr: false })

const styles = {
  wrapper: classNames(),
}

const Community: NextPage = () => {
  return (
    <Layout title='Community'>
      <div className={styles.wrapper}>Community</div>
    </Layout>
  )
}

export default Community
