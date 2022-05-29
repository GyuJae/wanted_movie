import { atom } from 'recoil'

export type TMediaTypeState = 'movie' | 'tv'

export const mediaTypeState = atom<TMediaTypeState>({
  key: '#mediaTypeState',
  default: 'movie',
})
