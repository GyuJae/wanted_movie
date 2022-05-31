import dynamic from 'next/dynamic'
import { mediaTypeState } from 'atoms/mediaTypeState'
import { useRecoilValue } from 'recoil'

const Layout = dynamic(() => import('@components/Layout'))
const Movies = dynamic(() => import('./Movies'))
const TVShows = dynamic(() => import('./TVShows'))

const Discovery = () => {
  const mediaTypeValue = useRecoilValue(mediaTypeState)
  return (
    <Layout>
      <Movies inView={mediaTypeValue === 'movie'} />
      <TVShows inView={mediaTypeValue === 'tv'} />
    </Layout>
  )
}

export default Discovery
