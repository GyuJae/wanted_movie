export type TvCategory = 'top_rated' | 'popular' | 'airing_today' | 'on_the_air'

export interface ITV {
  backdrop_path?: string
  first_air_date: string
  genre_ids: number[]
  id: number
  name: string
  origin_country: string
  original_language: string
  original_name: string
  overview: string
  popularity: number
  poster_path?: string
  vote_average: number
  vote_count: number
}

export interface ITVDetail {
  backdrop_path?: string
  created_by: {
    credit_id: string
    gender: number
    id: number
    name: string
    profile_path: string | null
  }[]
  episode_run_time: number[]
  first_air_date: string
  genres: {
    id: number
    name: string
  }[]
  homepage: string
  id: number
  in_production: boolean
  languages: string[]
  last_air_date: string
  last_episode_to_air: {
    air_date: string
    episode_number: number
    id: number
    name: string
    overview: string
    production_code: string
    season_number: number
    still_path: string
    vote_average: number
    vote_count: number
  }
  name: string
  networks: {
    id: number
    logo_path: string
    name: string
    origin_country: string
  }[]
  next_episode_to_air: string | null
  number_of_episodes: number
  number_of_seasons: number
  origin_country: string[]
  original_language: string
  original_name: string
  overview: string
  popularity: number
  poster_path?: string
  production_companies: {
    id: number
    logo_path: string
    name: string
    origin_country: string
  }[]
  production_countries: {
    iso_3166_1: string
    name: string
  }[]
  seasons: {
    air_date: string
    episode_count: number
    id: number
    name: string
    overview: string
    poster_path?: string
    season_number: number
  }[]
  spoken_languages: {
    english_name: string
    iso_639_1: string
    name: string
  }[]
  status: string
  tagline: string
  type: string
  vote_average: number
  vote_count: number
}

export interface ITVResult {
  page: number
  results: ITV[]
  total_pages: number
  total_results: number
}

export interface ICast {
  adult: boolean
  gender: number | null
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string | null
  cast_id: number
  character: string
  credit_id: string
  order: number
}

interface ICrew {
  adult: boolean
  gender: number | null
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: any | null
  credit_id: string
  department: string
  job: string
}

export interface ITVCredits {
  id: number
  cast: ICast[]
  crew: ICrew[]
}
