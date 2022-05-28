import { atom } from 'recoil'

export type TMediaTypeState = 'movie' | 'tv' | 'person'

export const mediaTypeState = atom<TMediaTypeState>({
  key: '#mediaTypeState',
  default: 'tv',
})
