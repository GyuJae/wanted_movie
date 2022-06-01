import MoviesService from '@services/movies.service'

import { IMovieCredits, IMovieDetail, IMovieGenres, IMovieResult, MovieCategory } from '../types/movie.d'
import { useInfiniteQuery, useQuery } from 'react-query'

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

export const useMovieGenres = () => {
  return useQuery<IMovieGenres, Error>(['movie', 'genres'], () => services.getGenres())
}

export const useInfiniteMovies = (category: MovieCategory) => {
  return useInfiniteQuery<IMovieResult, Error>(
    ['movies', category],
    ({ pageParam = 1 }) => services.getPageMovies({ category, pageParam }),
    {
      getNextPageParam: (lastPage: IMovieResult) => {
        if (lastPage.page < lastPage.total_pages) return lastPage.page + 1
        return undefined
      },
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
      retry: 1,
    }
  )
}
