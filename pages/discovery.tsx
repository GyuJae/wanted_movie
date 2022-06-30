import dynamic from 'next/dynamic'

const DiscoveryPage = dynamic(() => import('@components/Discovery'), { ssr: false })

const Discovery = () => {
  return <DiscoveryPage />
}

export default Discovery
