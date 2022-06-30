import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

const Bookmarked = dynamic(() => import('routes/Bookmarked'), { ssr: false })

const BookmarkedPage: NextPage = () => {
  return <Bookmarked />
}

export default BookmarkedPage
