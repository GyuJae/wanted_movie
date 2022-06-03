import { IBookmarkResponse } from 'types/bookmark'
import { ITVDetail } from 'types/tv'
import classNames from 'classnames'
import dynamic from 'next/dynamic'
import { useMe } from '@hooks/user'

import { createBookmark, deleteBookmark } from '@services/bookmark.service'
import { useMutation, useQueryClient } from 'react-query'

const BookMarkIcon = dynamic(() => import('@components/Icons/BookMarkIcon'))
const PencliIcon = dynamic(() => import('@components/Icons/PencliIcon'))

interface IProps {
  tv: ITVDetail
}

const FuncItems = ({ tv }: IProps) => {
  const queryClient = useQueryClient()
  
  const { data: meData } = useMe()
  const { mutate: createMutate, isLoading: createIsLoading } = useMutation(['bookmarked', 'create'], createBookmark, {
    onSuccess: (createData: IBookmarkResponse) => {
      if (createData.ok) {
        queryClient.refetchQueries(['user', 'me'])
      }
    }
  })
  const { mutate: deleteMutate, isLoading: deleteIsLoading } = useMutation(['bookmarked', 'create'], deleteBookmark, {
    onSuccess: (deleteData: IBookmarkResponse) => {
      if (deleteData.ok) {
        queryClient.setQueryData(['user', 'me'], {
          ...meData?.user, Bookmark: meData?.user?.Bookmark.filter(bookmarkItem => bookmarkItem.mediaId !== tv.id) })
      }
    }
  })

  const currentBookmarked = meData?.user?.Bookmark.map(bookmark => bookmark.mediaId).includes(tv.id)

  const handleClickBookmark = () => {
    if (!tv.poster_path || !meData || createIsLoading || deleteIsLoading) return
    if (currentBookmarked) {
      deleteMutate({
        mediaId: tv.id 
      })
    } else {
      createMutate({
        mediaType: 'tv',
        mediaId: tv.id,
        posterPath: tv.poster_path,
        title: tv.name,
        releaseDate: tv.first_air_date,
        vote: tv.vote_average,
      })
    }
  }
  
  return (
    <div className='flex justify-end px-12 space-x-3'>
      <button
        type='button'
        onClick={handleClickBookmark}
        className={'z-20 p-3  bg-zinc-900 hover:bg-zinc-800 rounded-full '}
      >
        <BookMarkIcon styleClassname={classNames('w-4 h-4 fill-zinc-500 pointer-event-none',{'fill-red-600': currentBookmarked})} />
      </button>
      <button type='button' className='z-20 p-3 bg-zinc-900 hover:bg-zinc-800 rounded-full'>
        <PencliIcon styleClassname='w-4 h-4  fill-zinc-500 pointer-event-none' />
      </button>
    </div>
  )
}

export default FuncItems
