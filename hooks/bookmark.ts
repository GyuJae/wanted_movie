import { useQuery } from 'react-query'

import { IBookmarkResponse, ILastBookmarkResponse } from 'types/bookmark.d'
import { lastBookmark, readBookmarks } from '@services/bookmark.service'

export const useLastBookmark = () => {
  return useQuery<ILastBookmarkResponse, Error>(['bookmark', 'last'], lastBookmark)
}

export const useBookmarkeds = () => {
  return useQuery<IBookmarkResponse,Error>('bookmarkeds', readBookmarks)
}