import TvsService from '@services/tvs.service'
import { useQuery } from 'react-query'

import { ITVDetail, ITVResult, TvCategory } from 'types/tv.d'

const services = new TvsService()

export const useTvs = (category: TvCategory) => {
  return useQuery<ITVResult, Error>(['tvs', category], () => services.getTvs(category))
}

export const useTv = (id: string) => {
  return useQuery<ITVDetail, Error>(['tv', id], () => services.getTV(id))
}
