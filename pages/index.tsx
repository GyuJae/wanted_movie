import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

const HomePage = dynamic(() => import('@components/Home'))

const Home: NextPage = () => {
  return <HomePage />
}

export default Home
