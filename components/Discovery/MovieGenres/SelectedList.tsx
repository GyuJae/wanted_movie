import { MouseEvent } from 'react'
import dynamic from 'next/dynamic'
import { movieSelectedGenres } from 'atoms/selectedGenres'
import { useRecoilState } from 'recoil'

const XIcon = dynamic(() => import('@components/Icons/XIcon'))

const SelectedList = () => {
  const [selected, setSelected] = useRecoilState(movieSelectedGenres)
  const handleClickRemove = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    const {
      currentTarget: { value },
    } = e
    setSelected((prev) => prev.filter((select) => select.id !== +value))
  }

  return (
    <div className='flex space-x-2'>
      {selected.length === 0 && (
        <div className='py-1 px-2 text-xs bg-red-800 rounded-md'>
          <span>All Genres</span>
        </div>
      )}
      {selected.map((genre, index) => {
        const key = `movie-genre-${genre.id}-${index}`
        return (
          <div key={key} className='flex items-center py-1 px-2 space-x-1 text-xs bg-red-800 rounded-md'>
            <span>{genre.name}</span>
            <button type='button' value={genre.id} onClick={handleClickRemove}>
              <XIcon styleClassname='w-3 h-3 fill-white mt-1 hover:scale-105' />
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default SelectedList
