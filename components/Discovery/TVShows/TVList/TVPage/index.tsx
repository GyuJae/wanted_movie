import { AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import { tvSelectedGenres } from 'atoms/selectedGenres'
import { useRecoilValue } from 'recoil'

import { IGenre, ITVResult } from 'types/tv'

const TVItem = dynamic(() => import('./TVItem'), { ssr: false })

interface IProps {
  tvPage: ITVResult
}

interface IFilter {
  tvPage: ITVResult
  selectedGenre: IGenre | null
}

const filtered = ({ tvPage, selectedGenre }: IFilter) => {
  if (!tvPage) return []
  if (!selectedGenre) return tvPage.results
  return tvPage.results.filter((movie) => {
    if (movie.genre_ids.includes(selectedGenre.id)) return true
    return false
  })
}

const TVPage = ({ tvPage }: IProps) => {
  const selectedGenre = useRecoilValue(tvSelectedGenres)

  return (
    <AnimatePresence>
      {filtered({ tvPage, selectedGenre }).map((tv, index) => {
        const key = `${tv.id}-${index}`
        return <TVItem key={key} tv={tv} />
      })}
    </AnimatePresence>
  )
}

export default TVPage
