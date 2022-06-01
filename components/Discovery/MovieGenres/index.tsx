import dynamic from 'next/dynamic'
import { movieSelectedGenres } from 'atoms/selectedGenres'
import { useClickAway } from 'react-use'
import { useMovieGenres } from '@hooks/movie'
import { useRecoilValue } from 'recoil'

import { useRef, useState } from 'react'

const GenreList = dynamic(() => import('./GenreList'))
const DownArrow = dynamic(() => import('@components/Icons/DownArrow'))

const MovieGenres = () => {
  const [open, setOpen] = useState<boolean>(false)
  const genresRef = useRef<HTMLDivElement>(null)
  const seletedGenre = useRecoilValue(movieSelectedGenres)
  const { data } = useMovieGenres()

  const handleClickOpen = () => setOpen(true)
  const handleClickClose = () => setOpen(false)

  useClickAway(genresRef, handleClickClose)

  if (!data) return null

  return (
    <div className='flex relative items-center space-y-4'>
      <div ref={genresRef} className='absolute top-16'>
        <GenreList inView={open} genres={data.genres} handleClickClose={handleClickClose} />
      </div>
      <div className='flex justify-between items-center py-2 px-3 w-40 bg-zinc-900 rounded-sm'>
        <span>{seletedGenre ? seletedGenre.name : 'All'}</span>
        <button type='button' onClick={handleClickOpen}>
          <DownArrow styleClassname='w-3 h-3 fill-white mt-1' />
        </button>
      </div>
    </div>
  )
}

export default MovieGenres
