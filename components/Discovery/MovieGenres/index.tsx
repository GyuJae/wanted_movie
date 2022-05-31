import dynamic from 'next/dynamic'
import { useClickAway } from 'react-use'
import { useMovieGenres } from '@hooks/movie'

import { useRef, useState } from 'react'

const GenreList = dynamic(() => import('./GenreList'))
const SelectedList = dynamic(() => import('./SelectedList'))
const DownArrow = dynamic(() => import('@components/Icons/DownArrow'))

const MovieGenres = () => {
  const [open, setOpen] = useState<boolean>(false)
  const genresRef = useRef<HTMLDivElement>(null)
  const { data } = useMovieGenres()

  const handleClickOpen = () => setOpen(true)
  const handleClickClose = () => setOpen(false)

  useClickAway(genresRef, handleClickClose)

  if (!data) return null

  return (
    <div ref={genresRef} className='flex relative items-center space-y-4'>
      <div className='absolute top-11'>
        <GenreList inView={open} genres={data.genres} />
      </div>
      <div className='flex justify-center items-center space-x-3 w-24 bg-zinc-900 rounded-sm'>
        <span>Genres</span>
        <button type='button' onClick={handleClickOpen}>
          <DownArrow styleClassname='w-3 h-3 fill-white mt-1' />
        </button>
      </div>
      <div className='ml-2'>
        <SelectedList />
      </div>
    </div>
  )
}

export default MovieGenres
