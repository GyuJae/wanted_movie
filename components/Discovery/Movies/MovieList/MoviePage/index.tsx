import { AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import { movieSelectedGenres } from 'atoms/selectedGenres'
import { useRecoilValue } from 'recoil'

import { IGenre, IMovieResult } from 'types/movie'

const MovieItem = dynamic(() => import('./MovieItem'), { ssr: false })

interface IProps {
  moviePage: IMovieResult
}

interface IFilter {
  moviePage: IMovieResult
  selectedGenre: IGenre | null
}

const filtered = ({ moviePage, selectedGenre }: IFilter) => {
  if (!moviePage) return []
  if (!selectedGenre) return moviePage.results
  return moviePage.results.filter((movie) => {
    if (movie.genre_ids.includes(selectedGenre.id)) return true
    return false
  })
}

const MoviePage = ({ moviePage }: IProps) => {
  const selectedGenre = useRecoilValue(movieSelectedGenres)

  return (
    <AnimatePresence>
      {filtered({ moviePage, selectedGenre }).map((movie, index) => {
        const key = `${movie.id}-${index}`
        return <MovieItem key={key} movie={movie} />
      })}
    </AnimatePresence>
  )
}

export default MoviePage
