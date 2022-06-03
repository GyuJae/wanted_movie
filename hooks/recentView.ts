import { useQuery } from 'react-query'

import { ILastRecentViewResponse, IRecentViewResponse } from 'types/recent.d'
import { lastRecentView, readRecentViews } from '@services/recentView.service'

export const useLastRecentView = () => {
  return useQuery<ILastRecentViewResponse, Error>(['recentView', 'last'], lastRecentView)
}

export const useRecentViews = () => {
  return useQuery<IRecentViewResponse, Error>('recentViews', readRecentViews)
}
