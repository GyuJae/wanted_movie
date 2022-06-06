import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { movieSelectedGenres } from 'atoms/selectedGenres'
import { useClickAway } from 'react-use'
import { useMovieGenres } from '@hooks/movie'
import { useRecoilValue } from 'recoil'

import { useRef, useState } from 'react'

const GenreList = dynamic(() => import('./GenreList'), { ssr: false })
const DownArrow = dynamic(() => import('@components/Icons/DownArrow'), { ssr: false })

const styles = {
  wrapper: 'flex relative items-center space-y-4',
  listContainer: 'absolute top-0 right-0',
  btnContainer: 'flex justify-between items-center py-2 px-3 w-40 bg-zinc-900 rounded-md',
  arrowIcon: 'w-3 h-3 fill-white mt-1',
}

const MovieGenres = () => {
  const [open, setOpen] = useState<boolean>(false)
  const genresRef = useRef<HTMLDivElement>(null)
  const seletedGenre = useRecoilValue(movieSelectedGenres)
  const { data } = useMovieGenres()

  const handleClickToggleOpen = () => setOpen((prev) => !prev)
  const handleClickClose = () => setOpen(false)

  useClickAway(genresRef, handleClickClose)

  if (!data) return null

  return (
    <div ref={genresRef} className={styles.wrapper}>
      <div className={styles.listContainer}>
        <GenreList inView={open} genres={data.genres} handleClickClose={handleClickClose} />
      </div>
      <motion.div layoutId='movie-genres' className={styles.btnContainer}>
        <span>{seletedGenre ? seletedGenre.name : 'All'}</span>
        <button type='button' onClick={handleClickToggleOpen}>
          <DownArrow styleClassname={styles.arrowIcon} />
        </button>
      </motion.div>
    </div>
  )
}

export default MovieGenres
