import dynamic from 'next/dynamic'
import { mediaTypeState } from 'atoms/mediaTypeState'
import { useRecoilValue } from 'recoil'

const Layout = dynamic(() => import('@components/Layout'), { ssr: false })
const Movies = dynamic(() => import('./Movies'), { ssr: false })
const TVShows = dynamic(() => import('./TVShows'), { ssr: false })
const Header = dynamic(() => import('./Header'), { ssr: false })

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
