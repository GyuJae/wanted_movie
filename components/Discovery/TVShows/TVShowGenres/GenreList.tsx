import { IGenre } from 'types/movie'
import { MouseEvent } from 'react'
import { scaleYVariants } from '@animations/variants'
import { tvSelectedGenres } from 'atoms/selectedGenres'
import { useSetRecoilState } from 'recoil'

import { AnimatePresence, motion } from 'framer-motion'

interface IProps {
  inView: boolean
  genres: IGenre[]
  handleClickClose: () => void
}

const styles = {
  wrapper: 'flex overflow-y-scroll flex-col w-48 h-48 text-sm bg-zinc-800 rounded-md shadow-md scrollBar',
  item: 'py-1 px-3 text-left hover:bg-zinc-900',
}

const GenreList = ({ inView, genres, handleClickClose }: IProps) => {
  const setSelected = useSetRecoilState(tvSelectedGenres)
  const handleClickAll = () => setSelected(null)
  const handleClickSelect = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    const {
      currentTarget: { value, id },
    } = e
    setSelected({ id: +id, name: value })
    handleClickClose()
  }
  return (
    <AnimatePresence>
      {inView && (
        <motion.ul
          variants={scaleYVariants}
          initial='initial'
          animate='animate'
          exit='exit'
          transition={{ type: 'tween' }}
          className={styles.wrapper}
        >
          <button type='button' onClick={handleClickAll}>
            <li className={styles.item}>All</li>
          </button>
          {genres.map((genre, index) => {
            const key = `tv-genre-${genre.id}-${index}`
            return (
              <button key={key} id={`${genre.id}`} value={genre.name} type='button' onClick={handleClickSelect}>
                <li className={styles.item}>{genre.name}</li>
              </button>
            )
          })}
        </motion.ul>
      )}
    </AnimatePresence>
  )
}

export default GenreList
