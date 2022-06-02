import { atom } from 'recoil'

export const showSideMeState = atom<boolean>({
  key: '#showSideMe',
  default: false,
})
