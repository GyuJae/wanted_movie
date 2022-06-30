import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

const Bookmarked = dynamic(() => import('@components/Bookmarked'), { ssr: false })

const BookmarkedPage: NextPage = () => {
  return <Bookmarked />
}

export default BookmarkedPage
