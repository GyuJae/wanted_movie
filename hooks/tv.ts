import TvsService from '@services/tvs.service'
import { useQuery } from 'react-query'

import { ITVCredits, ITVDetail, ITVGenres, ITVResult, TvCategory } from 'types/tv.d'

const services = new TvsService()

export const useTvs = (category: TvCategory) => {
  return useQuery<ITVResult, Error>(['tvs', category], () => services.getTvs(category))
}

export const useTv = (id: string) => {
  return useQuery<ITVDetail, Error>(['tv', id], () => services.getTV(id))
}

export const useTVRecommendations = (id: string) => {
  return useQuery<ITVResult, Error>(['tv', id, 'recommendations'], () => services.getRecommendations(id))
}

export const useTVCredits = (id: string) => {
  return useQuery<ITVCredits, Error>(['tv', id, 'credits'], () => services.getCredits(id))
}

export const useTVSimilar = (id: string) => {
  return useQuery<ITVResult, Error>(['tv', id, 'similar'], () => services.getSimilar(id))
}

export const useTVGenres = () => {
  return useQuery<ITVGenres, Error>(['tv', 'genres'], () => services.getGenres())
}
