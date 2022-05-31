import { IGenre } from 'types/movie'
import { atom } from 'recoil'

export const movieSelectedGenres = atom<IGenre[]>({
  key: '#movieSelectedGenres',
  default: [],
})

export const tvSelectedGenres = atom<IGenre[]>({
  key: '#tvSelectedGenres',
  default: [],
})
