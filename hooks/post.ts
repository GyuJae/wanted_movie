import { useQuery } from 'react-query'

import { IDetailPostInput, IDetailPostResponse, IPostResponse } from 'types/post.d'
import { readDetailPost, readPosts } from '@services/posts.service'

export const usePosts = () => {
  return useQuery<IPostResponse, Error>('posts', readPosts)
}

export const useDetailPost = ({ postId }: IDetailPostInput) => {
  return useQuery<IDetailPostResponse, Error>(['post', postId], () => readDetailPost({ postId }))
}
