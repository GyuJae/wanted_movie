import { AnimatePresence } from 'framer-motion'
import { IBookmarkResponse } from 'types/bookmark'
import dynamic from 'next/dynamic'

const BookmarkedItem = dynamic(() => import('./BookmarkedItem'))

interface IProps {
  data?: IBookmarkResponse
}

const BookmarkedList = ({ data }: IProps) => {
  if (!data || !data.ok || !data.bookmarks) return null
  return (
    <AnimatePresence>
      {data.bookmarks.map((bookmarked, index) => {
        const key = `${bookmarked.id}-${index}`
        return <BookmarkedItem key={key} bookmarked={bookmarked} />
      })}
    </AnimatePresence>
  )
}

export default BookmarkedList
