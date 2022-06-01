import { TvCategory } from 'types/tv'
import classNames from 'classnames'
import { mediaTypeState } from 'atoms/mediaTypeState'
import { tvCategoryDict } from 'dictionary/discoveryCategory'
import { tvDiscoveryState } from 'atoms/discoveryState'
import { useClickAway } from 'react-use'

import { MouseEvent, useRef, useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'

const items: TvCategory[] = ['top_rated', 'popular', 'airing_today', 'on_the_air']

const Movie = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState<boolean>(false)
  const setTVCategory = useSetRecoilState(tvDiscoveryState)
  const [mediaType, setMediaType] = useRecoilState(mediaTypeState)
  const handleToggleOpen = () => setOpen((prev) => !prev)
  const handleClose = () => setOpen(false)

  const handleSelectCategory = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    const {
      currentTarget: { value },
    } = e
    setTVCategory(value as TvCategory)
    setMediaType('tv')
    handleClose()
  }

  useClickAway(containerRef, handleClose)

  return (
    <div ref={containerRef} className='relative'>
      <button
        type='button'
        onClick={handleToggleOpen}
        className={classNames({ 'text-white font-semibold': mediaType === 'tv' })}
      >
        <span>TV Shows</span>
      </button>
      {open && (
        <div className='absolute top-8 z-10 py-2 w-24 text-sm bg-zinc-800 rounded-md'>
          {items.map((item, index) => {
            const key = `tv-${item}-${index}`
            return (
              <button
                key={key}
                value={item}
                onClick={handleSelectCategory}
                type='button'
                className='py-1 px-2 w-full text-left hover:bg-zinc-900'
              >
                {tvCategoryDict[item]}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Movie
