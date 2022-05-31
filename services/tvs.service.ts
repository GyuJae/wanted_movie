import { ITVCredits, ITVDetail, ITVResult, TvCategory } from 'types/tv.d'

class TvsService {
  private apiURL: string
  private API_KEY: string
  constructor() {
    this.apiURL = 'https://api.themoviedb.org/3/tv/'
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

  public getTvs = async (category: TvCategory): Promise<ITVResult> => {
    const response = await this.makeApiCall<ITVResult>(`${category}?api_key=${this.API_KEY}`)
    if (!response.results) {
      throw new Error('TVs not found')
    }
    return response
  }

  public getTV = async (id: string) => {
    const response = await this.makeApiCall<ITVDetail>(`${id}?api_key=${this.API_KEY}`)
    if (!response.id) {
      throw new Error('TV not found')
    }
    return response
  }

  public getRecommendations = async (id: string) => {
    const response = await this.makeApiCall<ITVResult>(`${id}/recommendations?api_key=${this.API_KEY}`)
    if (!response.results) {
      throw new Error('Movies not found')
    }
    return response
  }

  public getCredits = async (id: string) => {
    const response = await this.makeApiCall<ITVCredits>(`${id}/credits?api_key=${this.API_KEY}`)
    if (!response.id) {
      throw new Error('Movie not found')
    }
    return response
  }

  public getSimilar = async (id: string) => {
    const response = await this.makeApiCall<ITVResult>(`${id}/similar?api_key=${this.API_KEY}`)
    if (!response.results) {
      throw new Error('Movies not found')
    }
    return response
  }
}

export default TvsService
