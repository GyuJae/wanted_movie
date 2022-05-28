import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

const Layout = dynamic(() => import('@components/Layout'), { ssr: false })
const Trendings = dynamic(() => import('@components/Home/Trendings'), { ssr: false })

const Home: NextPage = () => {
  return (
    <Layout title='Home'>
      <Trendings />
    </Layout>
  )
}

export default Home
