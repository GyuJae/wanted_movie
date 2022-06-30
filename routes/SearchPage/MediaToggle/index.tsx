import classNames from 'classnames'
import { mediaTypeState } from '@atoms/mediaTypeState'
import { motion } from 'framer-motion'
import { useRecoilState } from 'recoil'

const MediaToggle = () => {
  const [mediaType, setMediaType] = useRecoilState(mediaTypeState)

  const handleClickMovie = () => setMediaType('movie')
  const handleClickTVShows = () => setMediaType('tv')

  return (
    <motion.div className='flex relative justify-between items-center px-4 w-40 h-8 text-xs font-semibold text-zinc-700 bg-zinc-900 rounded-full border-2 border-zinc-800'>
      <motion.div
        layout
        className={classNames(
          'absolute w-1/2 h-full bg-zinc-700 rounded-full',
          { 'left-0': mediaType === 'movie' },
          { 'right-0': mediaType === 'tv' }
        )}
      />
      <button
        type='button'
        onClick={handleClickMovie}
        className={classNames('z-10 font-semibold', { 'text-zinc-300': mediaType === 'movie' })}
      >
        Movie
      </button>
      <button
        type='button'
        onClick={handleClickTVShows}
        className={classNames('z-10 font-semibold ', { 'text-zinc-300': mediaType === 'tv' })}
      >
        TV Show
      </button>
    </motion.div>
  )
}

export default MediaToggle
