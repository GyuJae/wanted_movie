import axios from 'axios'

import { ICreateBookmarkInput, IDeleteBookmarkInput } from 'types/bookmark'

export const createBookmark = (createBookmarkInput: ICreateBookmarkInput) => {
  return axios.post('/api/bookmarks', createBookmarkInput).then((res) => res.data)
}

export const readBookmarks = ({ pageParam = 1 }: { pageParam?: number }) => {
  return axios.get(`/api/bookmarks?page=${pageParam}`).then((res) => res.data)
}

export const deleteBookmark = (deleteBookmarkInput: IDeleteBookmarkInput) => {
  return axios.delete('/api/bookmarks', { data: deleteBookmarkInput }).then((res) => res.data)
}

export const lastBookmark = () => {
  return axios.get('/api/bookmarks/last').then((res) => res.data)
}
