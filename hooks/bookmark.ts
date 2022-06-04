import { IBookmarkResponse, ILastBookmarkResponse } from 'types/bookmark.d'
import { lastBookmark, readBookmarks } from '@services/bookmark.service'
import { useInfiniteQuery, useQuery } from 'react-query'

export const useLastBookmark = () => {
  return useQuery<ILastBookmarkResponse, Error>(['bookmark', 'last'], lastBookmark)
}

export const useInfiniteBookmarked = () => {
  return useInfiniteQuery<IBookmarkResponse, Error>('bookmarked', ({ pageParam = 1 }) => readBookmarks({ pageParam }), {
    getNextPageParam: (lastPage: IBookmarkResponse) => {
      if (!lastPage.page || !lastPage.totalPage || !lastPage) return undefined
      if (lastPage.page < lastPage.totalPage) return lastPage.page + 1
      return undefined
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
    retry: 1,
  })
}
