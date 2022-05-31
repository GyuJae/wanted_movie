import { IGenre } from 'types/movie'
import { MouseEvent } from 'react'
import { movieSelectedGenres } from 'atoms/selectedGenres'
import { useRecoilState } from 'recoil'

import { AnimatePresence, motion } from 'framer-motion'

interface IProps {
  inView: boolean
  genres: IGenre[]
}

const GenreList = ({ inView, genres }: IProps) => {
  const [selected, setSelected] = useRecoilState(movieSelectedGenres)
  const handleClickSelect = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    const {
      currentTarget: { value, id },
    } = e
    setSelected((prev) => [...prev, { id: +id, name: value }])
  }
  if (!inView) return null
  return (
    <AnimatePresence initial={false}>
      <motion.ul layout className='flex flex-col w-32 text-sm bg-zinc-800 rounded-sm'>
        {genres
          .filter((genre) => !selected.map((s) => s.id).includes(genre.id))
          .map((genre, index) => {
            const key = `movie-genre-${genre.id}-${index}`
            return (
              <motion.button
                key={key}
                layout
                id={`${genre.id}`}
                value={genre.name}
                type='button'
                onClick={handleClickSelect}
              >
                <motion.li layout className='py-1 px-3 text-left hover:bg-zinc-900'>
                  {genre.name}
                </motion.li>
              </motion.button>
            )
          })}
      </motion.ul>
    </AnimatePresence>
  )
}

export default GenreList
