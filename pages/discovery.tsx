import dynamic from 'next/dynamic'

const DiscoveryPage = dynamic(() => import('routes/Discovery'), { ssr: false })

const Discovery = () => {
  return <DiscoveryPage />
}

export default Discovery
