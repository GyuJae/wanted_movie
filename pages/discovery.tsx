import dynamic from 'next/dynamic'

const DiscoveryPage = dynamic(() => import('@components/Discovery'))

const Discovery = () => {
  return <DiscoveryPage />
}

export default Discovery
