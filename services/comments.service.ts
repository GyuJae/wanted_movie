import axios from 'axios'

import { ICreateCommentInput, IDeleteCommentInput } from 'types/comment'

export const createComment = (createCommentInput: ICreateCommentInput) => {
  return axios.post(`/api/comments?postId=${createCommentInput.postId}`, createCommentInput).then((res) => res.data)
}

export const readComments = ({ pageParam = 1, postId }: { pageParam?: number; postId: number }) => {
  return axios.get(`/api/comments?postId=${postId}&page=${pageParam}`).then((res) => res.data)
}

export const deleteComment = (deleteCommentInput: IDeleteCommentInput) => {
  return axios.delete('/api/comments', { data: deleteCommentInput }).then((res) => res.data)
}
