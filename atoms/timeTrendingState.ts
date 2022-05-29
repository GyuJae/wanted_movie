import { atom } from 'recoil'

export type TTimeTrending = 'day' | 'week'

export const timeTrendingState = atom<TTimeTrending>({
  key: '#timeTrendingState',
  default: 'day',
})
