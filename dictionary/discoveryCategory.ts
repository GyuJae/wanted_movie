import { MovieCategory } from 'types/movie'
import { TvCategory } from 'types/tv'

export const movieCategoryDict: Record<MovieCategory, string> = {
  top_rated: 'Top Rated',
  popular: 'Popular',
  upcoming: 'Upcoming',
  now_playing: 'Now Playing',
}

export const tvCategoryDict: Record<TvCategory, string> = {
  top_rated: 'Top Rated',
  popular: 'Popular',
  airing_today: 'Airing Today',
  on_the_air: 'On The Air',
}
