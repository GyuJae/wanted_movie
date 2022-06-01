import { IGenre } from 'types/movie'
import { atom } from 'recoil'

export const movieSelectedGenres = atom<IGenre | null>({
  key: '#movieSelectedGenres',
  default: null,
})

export const tvSelectedGenres = atom<IGenre | null>({
  key: '#tvSelectedGenres',
  default: null,
})
