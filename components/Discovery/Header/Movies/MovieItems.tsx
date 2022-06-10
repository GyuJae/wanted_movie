import { MouseEvent } from 'react'
import { MovieCategory } from 'types/movie'
import { movieCategoryDict } from 'dictionary/discoveryCategory'

import { AnimatePresence, Variants, motion } from 'framer-motion'

interface IProps {
  inView: boolean
  handleSelectCategory: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void
}

const items: MovieCategory[] = ['top_rated', 'popular', 'upcoming', 'now_playing']

const containerVar: Variants = {
  initial: { opacity: 1, scale: 0 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    scale: 1,
    y: 20,
  },
}

const itemVar: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
}

const styles = {
  wrapper: 'absolute top-8 z-10 py-2 w-36 text-base bg-zinc-800 rounded-md',
  button: 'py-1 px-2 w-full text-left hover:bg-zinc-900',
}

const MovieItems = ({ inView, handleSelectCategory }: IProps) => {
  if (!inView) return <AnimatePresence />
  return (
    <AnimatePresence>
      <motion.ul className={styles.wrapper} variants={containerVar} initial='initial' animate='animate' exit='exit'>
        {items.map((item, index) => {
          const key = `movie-header-${item}-${index}`
          return (
            <motion.li key={key} variants={itemVar}>
              <button value={item} onClick={handleSelectCategory} type='button' className={styles.button}>
                {movieCategoryDict[item]}
              </button>
            </motion.li>
          )
        })}
      </motion.ul>
    </AnimatePresence>
  )
}

export default MovieItems
