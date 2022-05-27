export interface ITrendingResponse {
  page: number
  results: ITrending[]
  total_pages: number
  total_results: number
}

export interface ITrending {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
  popularity: number
}

export type TMediaType = 'all' | 'movie' | 'tv' | 'person'
