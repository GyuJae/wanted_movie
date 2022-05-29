import { IMovie } from './movie.d'
import { ITV } from './tv'

export interface ITrendingResponse {
  page: number
  results: IMovie[] | ITV[]
  total_pages: number
  total_results: number
}

export type TMediaType = 'movie' | 'tv'
