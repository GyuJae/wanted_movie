import { TvCategory } from 'types/tv'
import classNames from 'classnames'
import dynamic from 'next/dynamic'
import { mediaTypeState } from 'atoms/mediaTypeState'
import { tvDiscoveryState } from 'atoms/discoveryState'
import { useClickAway } from 'react-use'

import { MouseEvent, useRef, useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'

const TVShowItem = dynamic(() => import('./TVShowItem'), { ssr: false })

const TVShow = () => {
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
      <TVShowItem inView={open} handleSelectCategory={handleSelectCategory} />
    </div>
  )
}

export default TVShow
