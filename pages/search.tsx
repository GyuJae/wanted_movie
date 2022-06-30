import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

const SearchPage = dynamic(() => import('@components/SearchPage'), { ssr: false })

const Page: NextPage = () => {
  return <SearchPage />
}

export default Page
