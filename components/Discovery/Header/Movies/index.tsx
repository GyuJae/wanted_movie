import { MovieCategory } from 'types/movie'
import classNames from 'classnames'
import dynamic from 'next/dynamic'
import { mediaTypeState } from 'atoms/mediaTypeState'
import { movieDiscoveryState } from 'atoms/discoveryState'
import { useClickAway } from 'react-use'

import { MouseEvent, useRef, useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'

const MovieItems = dynamic(() => import('./MovieItems'), { ssr: false })

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
      <MovieItems inView={open} handleSelectCategory={handleSelectCategory} />
    </div>
  )
}

export default Movie
