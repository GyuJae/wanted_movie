import axios from 'axios'

import { ICreatePostInput, IDeletePostInput, IDetailPostInput } from 'types/post'

export const createPost = (createPostInput: ICreatePostInput) => {
  return axios.post('/api/posts', createPostInput).then((res) => res.data)
}

export const readPosts = () => {
  return axios.get('/api/posts').then((res) => res.data)
}

export const deletePost = (deletePostInput: IDeletePostInput) => {
  return axios.delete('/api/posts', { data: deletePostInput }).then((res) => res.data)
}

export const readDetailPost = ({ postId }: IDetailPostInput) => {
  return axios.get(`/api/posts/${postId}`).then((res) => res.data)
}
