import dynamic from 'next/dynamic'
import { mediaTypeState } from 'atoms/mediaTypeState'
import { useRecoilValue } from 'recoil'

const Layout = dynamic(() => import('@components/Layout'))
const Movies = dynamic(() => import('./Movies'))
const TVShows = dynamic(() => import('./TVShows'))
const Header = dynamic(() => import('./Header'))

const Discovery = () => {
  const mediaTypeValue = useRecoilValue(mediaTypeState)
  return (
    <Layout showHeader={false}>
      <Header />
      <Movies inView={mediaTypeValue === 'movie'} />
      <TVShows inView={mediaTypeValue === 'tv'} />
    </Layout>
  )
}

export default Discovery
