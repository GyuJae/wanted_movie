import { atom } from 'recoil'

export const loginToastMessageState = atom<boolean>({
  key: '#loginToastMessageState',
  default: false,
})
