import { IMovieCredits, IMovieDetail, IMovieResult, MovieCategory } from 'types/movie'

class MoviesService {
  private apiURL: string
  private API_KEY: string
  constructor() {
    this.apiURL = 'https://api.themoviedb.org/3/movie/'
    this.API_KEY = process.env.API_KEY as string
  }
  private makeApiCall = async <T>(apiPath: string): Promise<T> => {
    const response = await fetch(`${this.apiURL}${apiPath}`, {
      headers: {
        Accept: 'application/json',
      },
    })
    if (!response.ok) {
      throw new Error(`Error from api call ${apiPath}: status=${response.status} ${await response.text()}`)
    }
    return response.json()
  }

  public getMovies = async (category: MovieCategory): Promise<IMovieResult> => {
    const response = await this.makeApiCall<IMovieResult>(`${category}?api_key=${this.API_KEY}`)
    if (!response.results) {
      throw new Error('Movies not found')
    }
    return response
  }

  public getMovie = async (id: string) => {
    const response = await this.makeApiCall<IMovieDetail>(`${id}?api_key=${this.API_KEY}`)
    if (!response.id) {
      throw new Error('Movie not found')
    }
    return response
  }

  public getRecommendations = async (id: string) => {
    const response = await this.makeApiCall<IMovieResult>(`${id}/recommendations?api_key=${this.API_KEY}`)
    if (!response.results) {
      throw new Error('Movies not found')
    }
    return response
  }

  public getCredits = async (id: string) => {
    const response = await this.makeApiCall<IMovieCredits>(`${id}/credits?api_key=${this.API_KEY}`)
    if (!response.id) {
      throw new Error('Movie not found')
    }
    return response
  }

  public getSimilar = async (id: string) => {
    const response = await this.makeApiCall<IMovieResult>(`${id}/similar?api_key=${this.API_KEY}`)
    if (!response.results) {
      throw new Error('Movies not found')
    }
    return response
  }
}

export default MoviesService
