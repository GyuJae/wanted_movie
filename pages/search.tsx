import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

const SearchPage = dynamic(() => import('routes/SearchPage'), { ssr: false })

const Page: NextPage = () => {
  return <SearchPage />
}

export default Page
