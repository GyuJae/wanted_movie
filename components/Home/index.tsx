import React from 'react'
import dynamic from 'next/dynamic'

const Current = dynamic(() => import('@components/Home/Current'), { ssr: false })
const Now = dynamic(() => import('@components/Home/Now'), { ssr: false })
const Layout = dynamic(() => import('@components/Layout'), { ssr: false })
const Trendings = dynamic(() => import('@components/Home/Trendings'), { ssr: false })
const TopRated = dynamic(() => import('@components/Home/TopRated'), { ssr: false })
const Popular = dynamic(() => import('@components/Home/Popular'), { ssr: false })

const HomePage = () => {
  return (
    <Layout title='Home'>
      <div className='px-4 pb-10 space-y-12'>
        <Trendings />
        <Now />
        <TopRated />
        <Popular />
        <Current />
      </div>
    </Layout>
  )
}

export default HomePage
