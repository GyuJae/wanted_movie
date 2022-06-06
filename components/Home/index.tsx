import React from 'react'
import dynamic from 'next/dynamic'

const Current = dynamic(() => import('@components/Home/Current'))
const Now = dynamic(() => import('@components/Home/Now'))
const Layout = dynamic(() => import('@components/Layout'))
const Trendings = dynamic(() => import('@components/Home/Trendings'))
const TopRated = dynamic(() => import('@components/Home/TopRated'))
const Popular = dynamic(() => import('@components/Home/Popular'))

const HomePage = () => {
  return (
    <Layout title='Home'>
      <div className='homeGrid'>
        <Trendings />
        <Current />
        <TopRated />
        <Popular />
        <Now />
      </div>
    </Layout>
  )
}

export default HomePage
