import MoviesService from '@services/movies.service'
import { useQuery } from 'react-query'

import { IMovieCredits, IMovieDetail, IMovieResult, MovieCategory } from 'types/movie'

const services = new MoviesService()

export const useMovies = (category: MovieCategory) => {
  return useQuery<IMovieResult, Error>(['movies', category], () => services.getMovies(category))
}

export const useMovie = (id: string) => {
  return useQuery<IMovieDetail, Error>(['movie', id], () => services.getMovie(id))
}

export const useMovieRecommendations = (id: string) => {
  return useQuery<IMovieResult, Error>(['movie', id, 'recommendations'], () => services.getRecommendations(id))
}

export const useMovieCredits = (id: string) => {
  return useQuery<IMovieCredits, Error>(['movie', id, 'credits'], () => services.getCredits(id))
}

export const useMovieSimilar = (id: string) => {
  return useQuery<IMovieResult, Error>(['movie', id, 'similar'], () => services.getSimilar(id))
}
