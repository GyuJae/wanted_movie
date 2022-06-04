import { ILastRecentViewResponse, IRecentViewResponse } from 'types/recent.d'
import { lastRecentView, readRecentViews } from '@services/recentView.service'
import { useInfiniteQuery, useQuery } from 'react-query'

export const useLastRecentView = () => {
  return useQuery<ILastRecentViewResponse, Error>(['recentView', 'last'], lastRecentView)
}

export const useInfiniteRecentViews = () => {
  return useInfiniteQuery<IRecentViewResponse, Error>(
    'recentViews',
    ({ pageParam = 1 }) => readRecentViews({ pageParam }),
    {
      getNextPageParam: (lastPage: IRecentViewResponse) => {
        if (!lastPage.page || !lastPage.totalPage || !lastPage) return undefined
        if (lastPage.page < lastPage.totalPage) return lastPage.page + 1
        return undefined
      },
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
      retry: 1,
    }
  )
}
