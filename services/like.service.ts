import { IToggleLikeInput } from 'types/like'
import axios from 'axios'

export const toggleLike = ({ postId }: IToggleLikeInput) => {
  return axios.post(`/api/likes?postId=${postId}`).then((res) => res.data)
}

export const readLike = ({ postId }: IToggleLikeInput) => {
  return axios.get(`/api/likes?postId=${postId}`).then((res) => res.data)
}
