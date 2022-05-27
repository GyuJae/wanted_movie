import { atom } from 'recoil'

export type TMediaTypeState = 'movie' | 'tv' | 'person'

export const mediaTypeState = atom<TMediaTypeState>({
  key: '#mediaTypeState', // unique ID (with respect to other atoms/selectors)
  default: 'movie', // default value (aka initial value)
})
