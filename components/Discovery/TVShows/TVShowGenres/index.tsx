import dynamic from 'next/dynamic'
import { tvSelectedGenres } from 'atoms/selectedGenres'
import { useClickAway } from 'react-use'
import { useRecoilValue } from 'recoil'
import { useTVGenres } from '@hooks/tv'

import { useRef, useState } from 'react'

const GenreList = dynamic(() => import('./GenreList'))
const DownArrow = dynamic(() => import('@components/Icons/DownArrow'))

const MovieGenres = () => {
  const [open, setOpen] = useState<boolean>(false)
  const genresRef = useRef<HTMLDivElement>(null)
  const seletedGenre = useRecoilValue(tvSelectedGenres)
  const { data } = useTVGenres()

  const handleClickToggleOpen = () => setOpen((prev) => !prev)
  const handleClickClose = () => setOpen(false)

  useClickAway(genresRef, handleClickClose)

  if (!data) return null

  return (
    <div ref={genresRef} className='flex relative items-center space-y-4'>
      <div className='absolute top-16'>
        <GenreList inView={open} genres={data.genres} handleClickClose={handleClickClose} />
      </div>
      <div className='flex justify-between items-center py-2 px-3 w-40 bg-zinc-900 rounded-sm'>
        <span>{seletedGenre ? seletedGenre.name : 'All'}</span>
        <button type='button' onClick={handleClickToggleOpen}>
          <DownArrow styleClassname='w-3 h-3 fill-white mt-1' />
        </button>
      </div>
    </div>
  )
}

export default MovieGenres
