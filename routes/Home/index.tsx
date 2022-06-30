import { IHomePage } from 'types/Home'
import React from 'react'
import dynamic from 'next/dynamic'

const Current = dynamic(() => import('routes/Home/Current'))
const Now = dynamic(() => import('routes/Home/Now'))
const Layout = dynamic(() => import('@components/Layout'))
const Trendings = dynamic(() => import('routes/Home/Trendings'))
const TopRated = dynamic(() => import('routes/Home/TopRated'))
const Popular = dynamic(() => import('routes/Home/Popular'))

const HomePage = ({ data }: IHomePage) => {
  return (
    <Layout title='Home'>
      <div className='homeGrid'>
        <Trendings
          dayMovies={data.trendingDayMovies}
          weekMovies={data.trendingWeekMovies}
          dayTVs={data.trendingDayTV}
          weekTVs={data.trendingWeekTV}
        />
        <Current movies={data.upcomingMovies} tvs={data.airingTodayTVs} />
        <TopRated movies={data.topRatedMovies} tvs={data.topRatedTVs} />
        <Popular movies={data.popularMovies} tvs={data.popularTVs} />
        <Now movies={data.nowPlayingMovies} tvs={data.onTheAirTVs} />
      </div>
    </Layout>
  )
}

export default HomePage
