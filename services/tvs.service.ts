import axios from 'axios'

import { ITVCredits, ITVDetail, ITVGenres, ITVResult, TvCategory } from 'types/tv.d'

class TvsService {
  private apiURL: string
  private NEXT_PUBLIC_API_KEY: string
  constructor() {
    this.apiURL = 'https://api.themoviedb.org/3/'
    this.NEXT_PUBLIC_API_KEY = process.env.NEXT_PUBLIC_API_KEY as string
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

  public getTvs = async (category: TvCategory): Promise<ITVResult> => {
    const response = await this.makeApiCall<ITVResult>(`tv/${category}?api_key=${this.NEXT_PUBLIC_API_KEY}`)
    if (!response.results) {
      throw new Error('TVs not found')
    }
    return response
  }

  public getPageTVs = async ({
    category,
    pageParam = 1,
  }: {
    category: TvCategory
    pageParam?: number
  }): Promise<ITVResult> => {
    const response = await this.makeApiCall<ITVResult>(
      `tv/${category}?api_key=${this.NEXT_PUBLIC_API_KEY}&page=${pageParam}`
    )
    if (!response.results) {
      throw new Error('TV Shows not found')
    }
    return response
  }

  public getTV = async (id: string) => {
    const response = await this.makeApiCall<ITVDetail>(`tv/${id}?api_key=${this.NEXT_PUBLIC_API_KEY}`)
    if (!response.id) {
      throw new Error('TV not found')
    }
    return response
  }

  public getRecommendations = async (id: string) => {
    const response = await this.makeApiCall<ITVResult>(`tv/${id}/recommendations?api_key=${this.NEXT_PUBLIC_API_KEY}`)
    if (!response.results) {
      throw new Error('Movies not found')
    }
    return response
  }

  public getCredits = async (id: string) => {
    const response = await this.makeApiCall<ITVCredits>(`tv/${id}/credits?api_key=${this.NEXT_PUBLIC_API_KEY}`)
    if (!response.id) {
      throw new Error('Movie not found')
    }
    return response
  }

  public getSimilar = async (id: string) => {
    const response = await this.makeApiCall<ITVResult>(`tv/${id}/similar?api_key=${this.NEXT_PUBLIC_API_KEY}`)
    if (!response.results) {
      throw new Error('Movies not found')
    }
    return response
  }

  public getGenres = async () => {
    const response = await this.makeApiCall<ITVGenres>(`genre/movie/list?api_key=${this.NEXT_PUBLIC_API_KEY}`)
    if (!response.genres) {
      throw new Error('Genres not found')
    }
    return response
  }

  public getSearch = async ({ query, pageParam = 1 }: { query: string; pageParam?: number }) => {
    const response = await this.makeApiCall<ITVResult>(
      `search/tv?api_key=${this.NEXT_PUBLIC_API_KEY}&query=${query}&page=${pageParam}`
    )
    if (!response.results) {
      throw new Error('Genres not found')
    }
    return response
  }
}

export default TvsService
