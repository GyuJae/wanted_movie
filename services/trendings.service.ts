import { ITrendingResponse, TMediaType } from '../types/trending.d'

class TrendingsService {
  private apiURL: string
  private API_KEY: string
  constructor() {
    this.apiURL = 'https://api.themoviedb.org/3/trending/'
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

  public getTrendings = async (mediaType: TMediaType, time: 'day' | 'week'): Promise<ITrendingResponse> => {
    const response = await this.makeApiCall<ITrendingResponse>(`${mediaType}/${time}?api_key=${this.API_KEY}`)
    if (!response.results) {
      throw new Error('Trending not found')
    }
    return response
  }
}

export default TrendingsService
