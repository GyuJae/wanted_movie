import axios from 'axios'

import { ICreateBookmarkInput, IDeleteBookmarkInput } from 'types/bookmark'

export const createBookmark = (createBookmarkInput: ICreateBookmarkInput) => {
  return axios.post('/api/bookmarks', createBookmarkInput).then((res) => res.data)
}

export const readBookmarks = () => {
  return axios.get('/api/bookmarks').then((res) => res.data)
}

export const deleteBookmark = (deleteBookmarkInput: IDeleteBookmarkInput) => {
  return axios.delete('/api/bookmarks', { data: deleteBookmarkInput }).then((res) => res.data)
}

export const lastBookmark = () => {
  return axios.get('/api/bookmarks/last').then((res) => res.data)
}
