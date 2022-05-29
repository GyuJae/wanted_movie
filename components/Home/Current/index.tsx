import dynamic from 'next/dynamic'
import { mediaTypeState } from 'atoms/mediaTypeState'
import { useRecoilValue } from 'recoil'

const Movies = dynamic(() => import('./Movies'))
const TVShows = dynamic(() => import('./TVShows'))

const Popular = () => {
  const mediaType = useRecoilValue(mediaTypeState)

  return (
    <div className='space-y-4'>
      <div className='flex items-center'>
        <h3 className='text-xl font-semibold'>{mediaType === 'movie' ? 'Upcoming' : 'Airing Today'}</h3>
      </div>
      <Movies inView={mediaType === 'movie'} />
      <TVShows inView={mediaType === 'tv'} />
    </div>
  )
}

export default Popular
