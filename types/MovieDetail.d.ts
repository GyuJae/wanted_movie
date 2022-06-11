import { IMovieCredits, IMovieDetail, IMovieResult } from './movie'

export interface IMovieDetailPage {
  movie: IMovieDetail
  credits: IMovieCredits
  recommendations: IMovieResult
  similar: IMovieResult
}
