import { IBookmarkResponse } from 'types/bookmark'
import { IMovieDetail } from 'types/movie'
import { TMediaType } from 'types/trending'
import classNames from 'classnames'
import dynamic from 'next/dynamic'
import { loginToastMessageState } from '@atoms/loginToastMessageState'
import { useMe } from '@hooks/user'
import { useSetRecoilState } from 'recoil'

import { createBookmark, deleteBookmark } from '@services/bookmark.service'
import { useMutation, useQueryClient } from 'react-query'

const BookMarkIcon = dynamic(() => import('@components/Icons/BookMarkIcon'), { ssr: false })

interface IProps {
  movie: IMovieDetail
}

const styles = {
  button: 'z-20 p-3 bg-zinc-900 hover:bg-zinc-800 rounded-full',
  icon: (currentBookmarked?: boolean) =>
    classNames('w-4 h-4 fill-zinc-500 pointer-event-none', { 'fill-red-600': currentBookmarked }),
}

const BookmarkComponent = ({ movie }: IProps) => {
  const setLoginToastMessage = useSetRecoilState(loginToastMessageState)
  const queryClient = useQueryClient()

  const newMedia = {
    mediaType: 'movie' as TMediaType,
    mediaId: movie.id,
    posterPath: movie.poster_path as string,
    title: movie.title,
    releaseDate: movie.release_date,
    vote: movie.vote_average,
  }

  const { data: meData } = useMe()

  const { mutate: createMutate, isLoading: createIsLoading } = useMutation(['bookmarked', 'create'], createBookmark, {
    onSuccess: (createData: IBookmarkResponse) => {
      if (createData.ok) {
        queryClient.refetchQueries(['user', 'me'])
      }
    },
  })
  const { mutate: deleteMutate, isLoading: deleteIsLoading } = useMutation(['bookmarked', 'create'], deleteBookmark, {
    onSuccess: (deleteData: IBookmarkResponse) => {
      if (deleteData.ok) {
        queryClient.setQueryData(['user', 'me'], {
          ...meData?.user,
          Bookmark: meData?.user?.Bookmark.filter((bookmarkItem) => bookmarkItem.mediaId !== movie.id),
        })
      }
    },
  })

  const currentBookmarked = meData?.user?.Bookmark.map((bookmark) => bookmark.mediaId).includes(movie.id)

  const handleOpenLoginToastMessage = () => setLoginToastMessage(true)

  const handleClickBookmark = () => {
    if (!meData) handleOpenLoginToastMessage()

    if (!movie.poster_path || !meData || createIsLoading || deleteIsLoading) return
    if (currentBookmarked) {
      deleteMutate({
        mediaId: movie.id,
      })
    } else {
      createMutate(newMedia)
    }
  }
  return (
    <button type='button' onClick={handleClickBookmark} className={styles.button}>
      <BookMarkIcon styleClassname={styles.icon(currentBookmarked)} />
    </button>
  )
}

export default BookmarkComponent
