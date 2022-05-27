import MoviesService from '@services/movies.service'
import { useQuery } from 'react-query'

import { IMovieDetail, IMovieResult, MovieCategory } from 'types/movie'

const services = new MoviesService()

export const useMovies = (category: MovieCategory) => {
  return useQuery<IMovieResult, Error>(['movies', category], () => services.getMovies(category))
}

export const useMovie = (id: string) => {
  return useQuery<IMovieDetail, Error>(['movie', id], () => services.getMovie(id))
}
