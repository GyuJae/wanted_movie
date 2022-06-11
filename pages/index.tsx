import { IHomePage } from 'types/Home'
import MoviesService from '@services/movies.service'
import type { NextPage } from 'next'
import TrendingsService from '@services/trendings.service'
import TvsService from '@services/tvs.service'
import dynamic from 'next/dynamic'

const HomePage = dynamic(() => import('@components/Home'), { ssr: false })

export async function getStaticProps() {
  const trendingsService = new TrendingsService()
  const movieServices = new MoviesService()
  const tvServices = new TvsService()

  const trendingDayMovies = await trendingsService.getTrendings('movie', 'day')
  const trendingWeekMovies = await trendingsService.getTrendings('movie', 'week')
  const trendingDayTV = await trendingsService.getTrendings('tv', 'day')
  const trendingWeekTV = await trendingsService.getTrendings('tv', 'week')

  const topRatedMovies = await movieServices.getMovies('top_rated')
  const popularMovies = await movieServices.getMovies('popular')
  const nowPlayingMovies = await movieServices.getMovies('now_playing')
  const upcomingMovies = await movieServices.getMovies('upcoming')

  const topRatedTVs = await tvServices.getTvs('top_rated')
  const popularTVs = await tvServices.getTvs('popular')
  const airingTodayTVs = await tvServices.getTvs('airing_today')
  const onTheAirTVs = await tvServices.getTvs('on_the_air')

  return {
    props: {
      data: {
        trendingDayMovies,
        trendingWeekMovies,
        trendingDayTV,
        trendingWeekTV,
        topRatedMovies,
        popularMovies,
        nowPlayingMovies,
        upcomingMovies,
        topRatedTVs,
        popularTVs,
        airingTodayTVs,
        onTheAirTVs,
      },
    },
    revalidate: 60 * 60 * 12,
  }
}

const Home: NextPage<IHomePage> = ({ data }) => {
  return <HomePage data={data} />
}

export default Home
