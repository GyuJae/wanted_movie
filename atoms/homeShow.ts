import { atom } from 'recoil'

export type THomeShowState = 'movie' | 'tv' | 'people'

export const homeShowState = atom<THomeShowState>({
  key: '#homeShowState', // unique ID (with respect to other atoms/selectors)
  default: 'movie', // default value (aka initial value)
})
