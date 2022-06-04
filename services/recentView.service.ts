import axios from 'axios'

import { ICreateRecentViewInput, IDeleteRecentViewInput } from 'types/recent.d'

export const createRecentView = (createRecentViewInput: ICreateRecentViewInput) => {
  return axios.post('/api/recentViews', createRecentViewInput).then((res) => res.data)
}

export const readRecentViews = ({ pageParam = 1 }: { pageParam?: number }) => {
  return axios.get(`/api/recentViews?page=${pageParam}`).then((res) => res.data)
}

export const deleteRecentView = (deleteRecentViewInput: IDeleteRecentViewInput) => {
  return axios.delete('/api/recentViews', { data: deleteRecentViewInput }).then((res) => res.data)
}

export const lastRecentView = () => {
  return axios.get('/api/recentViews/last').then((res) => res.data)
}
