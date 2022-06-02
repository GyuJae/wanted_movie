import { atom } from 'recoil'

export const accountOpenState = atom<boolean>({
  key: '#accountOpenState',
  default: false,
})
