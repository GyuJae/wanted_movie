import TvsService from '@services/tvs.service'

import { ITVCredits, ITVDetail, ITVGenres, ITVResult, TvCategory } from 'types/tv.d'
import { useInfiniteQuery, useQuery } from 'react-query'

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

export const useInfiniteTVs = (category: TvCategory) => {
  return useInfiniteQuery<ITVResult, Error>(
    ['tv', category],
    ({ pageParam = 1 }) => services.getPageTVs({ category, pageParam }),
    {
      getNextPageParam: (lastPage: ITVResult) => {
        if (lastPage.page < lastPage.total_pages) return lastPage.page + 1
        return undefined
      },
      retry: 1,
    }
  )
}

export const useInfiniteSearchTVs = (query: string) => {
  return useInfiniteQuery<ITVResult, Error>(
    ['tvs', 'search', query],
    ({ pageParam = 1 }) => services.getSearch({ query, pageParam }),
    {
      getNextPageParam: (lastPage: ITVResult) => {
        if (lastPage.page < lastPage.total_pages) return lastPage.page + 1
        return undefined
      },
      enabled: !!query,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
      retry: 1,
    }
  )
}
