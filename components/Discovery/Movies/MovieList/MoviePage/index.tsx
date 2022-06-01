import { AnimatePresence } from 'framer-motion'
import { IMovieResult } from 'types/movie'
import dynamic from 'next/dynamic'
import { movieSelectedGenres } from 'atoms/selectedGenres'
import { useRecoilValue } from 'recoil'

const MovieItem = dynamic(() => import('./MovieItem'))

interface IProps {
  moviePage: IMovieResult
}

const MoviePage = ({ moviePage }: IProps) => {
  const selectedGenre = useRecoilValue(movieSelectedGenres)
  const filtered = () => {
    if (!moviePage) return []
    if (!selectedGenre) return moviePage.results
    return moviePage.results.filter((movie) => {
      if (movie.genre_ids.includes(selectedGenre.id)) return true
      return false
    })
  }
  return (
    <AnimatePresence initial={false}>
      {filtered().map((movie, index) => {
        const key = `${movie.id}-${index}`
        return <MovieItem key={key} movie={movie} />
      })}
    </AnimatePresence>
  )
}

export default MoviePage
