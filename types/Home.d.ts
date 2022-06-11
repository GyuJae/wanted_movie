import { IMovieResult } from 'types/movie'
import { ITVResult } from 'types/tv'
import { ITrendingResponse } from 'types/trending'

export interface IHomePage {
  data: {
    trendingDayMovies: ITrendingResponse
    trendingWeekMovies: ITrendingResponse
    trendingDayTV: ITrendingResponse
    trendingWeekTV: ITrendingResponse
    topRatedMovies: IMovieResult
    popularMovies: IMovieResult
    nowPlayingMovies: IMovieResult
    upcomingMovies: IMovieResult
    topRatedTVs: ITVResult
    popularTVs: ITVResult
    airingTodayTVs: ITVResult
    onTheAirTVs: ITVResult
  }
}
