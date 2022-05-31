import { MovieCategory } from 'types/movie'
import { TvCategory } from 'types/tv'
import { atom } from 'recoil'

export const movieDiscoveryState = atom<MovieCategory>({
  key: '#discoveryState',
  default: 'popular',
})

export const tvDiscoveryState = atom<TvCategory>({
  key: '#discoveryState',
  default: 'popular',
})
