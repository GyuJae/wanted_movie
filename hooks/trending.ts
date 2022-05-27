import TrendingsService from '@services/trendings.service'
import { useQuery } from 'react-query'

import { ITrendingResponse, TMediaType } from '../types/trending.d'

const services = new TrendingsService()

export const useTrendings = (mediaType: TMediaType, time: 'day' | 'week') => {
  return useQuery<ITrendingResponse, Error>(['trendins', mediaType, time], () => services.getTrendings(mediaType, time))
}
