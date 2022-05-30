import { atom } from 'recoil'

export const showNavState = atom<boolean>({
  key: '#showNavState',
  default: true,
})
