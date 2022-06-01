import { MovieCategory } from 'types/movie'
import classNames from 'classnames'
import { mediaTypeState } from 'atoms/mediaTypeState'
import { movieCategoryDict } from 'dictionary/discoveryCategory'
import { movieDiscoveryState } from 'atoms/discoveryState'
import { useClickAway } from 'react-use'

import { MouseEvent, useRef, useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'

const items: MovieCategory[] = ['top_rated', 'popular', 'upcoming', 'now_playing']

const Movie = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState<boolean>(false)
  const setMovieCategory = useSetRecoilState(movieDiscoveryState)
  const [mediaType, setMediaType] = useRecoilState(mediaTypeState)
  const handleToggleOpen = () => setOpen((prev) => !prev)
  const handleClose = () => setOpen(false)

  const handleSelectCategory = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    const {
      currentTarget: { value },
    } = e
    setMovieCategory(value as MovieCategory)
    setMediaType('movie')
    handleClose()
  }

  useClickAway(containerRef, handleClose)

  return (
    <div ref={containerRef} className='relative'>
      <button
        type='button'
        onClick={handleToggleOpen}
        className={classNames({ 'text-white font-semibold': mediaType === 'movie' })}
      >
        <span>Movies</span>
      </button>
      {open && (
        <div className='absolute top-8 z-10 py-2 w-24 text-sm bg-zinc-800 rounded-md'>
          {items.map((item, index) => {
            const key = `movie-${item}-${index}`
            return (
              <button
                key={key}
                value={item}
                onClick={handleSelectCategory}
                type='button'
                className='py-1 px-2 w-full text-left hover:bg-zinc-900'
              >
                {movieCategoryDict[item]}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Movie
