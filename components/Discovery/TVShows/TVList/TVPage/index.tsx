import { AnimatePresence } from 'framer-motion'
import { ITVResult } from 'types/tv'
import dynamic from 'next/dynamic'
import { tvSelectedGenres } from 'atoms/selectedGenres'
import { useRecoilValue } from 'recoil'

const TVItem = dynamic(() => import('./TVItem'))

interface IProps {
  tvPage: ITVResult
}

const TVPage = ({ tvPage }: IProps) => {
  const selectedGenre = useRecoilValue(tvSelectedGenres)
  const filtered = () => {
    if (!tvPage) return []
    if (!selectedGenre) return tvPage.results
    return tvPage.results.filter((movie) => {
      if (movie.genre_ids.includes(selectedGenre.id)) return true
      return false
    })
  }
  return (
    <AnimatePresence initial={false}>
      {filtered().map((tv, index) => {
        const key = `${tv.id}-${index}`
        return <TVItem key={key} tv={tv} />
      })}
    </AnimatePresence>
  )
}

export default TVPage
