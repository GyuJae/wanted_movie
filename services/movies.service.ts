import { ISearchKeywordResult } from 'types/search'
import axios from 'axios'

import { IMovieCredits, IMovieDetail, IMovieGenres, IMovieResult, MovieCategory } from 'types/movie'

class MoviesService {
  private apiURL: string
  private API_KEY: string
  constructor() {
    this.apiURL = 'https://api.themoviedb.org/3/'
    this.API_KEY = process.env.API_KEY as string
  }
  private makeApiCall = async <T>(apiPath: string): Promise<T> => {
    const response = await axios.get(`${this.apiURL}${apiPath}`, {
      headers: {
        Accept: 'application/json',
      },
    })
    if (!response.data) {
      throw new Error(`Error from api call ${apiPath}: status=${response.status} ${response.statusText}`)
    }
    return response.data
  }

  public getMovies = async (category: MovieCategory): Promise<IMovieResult> => {
    const response = await this.makeApiCall<IMovieResult>(`movie/${category}?api_key=${this.API_KEY}`)
    if (!response.results) {
      throw new Error('Movies not found')
    }
    return response
  }

  public getPageMovies = async ({
    category,
    pageParam = 1,
  }: {
    category: MovieCategory
    pageParam?: number
  }): Promise<IMovieResult> => {
    const response = await this.makeApiCall<IMovieResult>(`movie/${category}?api_key=${this.API_KEY}&page=${pageParam}`)
    if (!response.results) {
      throw new Error('Movies not found')
    }
    return response
  }

  public getMovie = async (id: string) => {
    const response = await this.makeApiCall<IMovieDetail>(`movie/${id}?api_key=${this.API_KEY}`)
    if (!response.id) {
      throw new Error('Movie not found')
    }
    return response
  }

  public getRecommendations = async (id: string) => {
    const response = await this.makeApiCall<IMovieResult>(`movie/${id}/recommendations?api_key=${this.API_KEY}`)
    if (!response.results) {
      throw new Error('Movies not found')
    }
    return response
  }

  public getCredits = async (id: string) => {
    const response = await this.makeApiCall<IMovieCredits>(`movie/${id}/credits?api_key=${this.API_KEY}`)
    if (!response.id) {
      throw new Error('Movie not found')
    }
    return response
  }

  public getSimilar = async (id: string) => {
    const response = await this.makeApiCall<IMovieResult>(`movie/${id}/similar?api_key=${this.API_KEY}`)
    if (!response.results) {
      throw new Error('Movies not found')
    }
    return response
  }

  public getGenres = async () => {
    const response = await this.makeApiCall<IMovieGenres>(`genre/movie/list?api_key=${this.API_KEY}`)
    if (!response.genres) {
      throw new Error('Genres not found')
    }
    return response
  }

  public getSearch = async ({ query, pageParam = 1 }: { query: string; pageParam?: number }) => {
    const response = await this.makeApiCall<IMovieResult>(
      `search/movie?api_key=${this.API_KEY}&query=${query}&page=${pageParam}`
    )
    if (!response.results) {
      throw new Error('Genres not found')
    }
    return response
  }

  public getSearchKeyword = async (query: string) => {
    const response = await this.makeApiCall<ISearchKeywordResult>(`search/keyword?query=${query}`)
    if (!response.results) {
      throw new Error('Genres not found')
    }
    return response
  }
}

export default MoviesService
