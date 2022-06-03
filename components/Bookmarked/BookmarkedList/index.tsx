import dynamic from 'next/dynamic'
import { useBookmarkeds } from '@hooks/bookmark'

const BookmarkedItem = dynamic(() => import('./BookmarkedItem'))

const BookmarkedList = () => {
  const { data } = useBookmarkeds()
  if (!data || !data.ok || !data.bookmarks) return null
  return (
    <div className='grid grid-cols-2 gap-4 justify-center py-4 sm:grid-cols-3  md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
      {data.bookmarks.map((bookmarked, index) => {
        const key = `${bookmarked.id}-${index}`
        return <BookmarkedItem key={key} bookmarked={bookmarked} />
      })}
    </div>
  )
}

export default BookmarkedList
