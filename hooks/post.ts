import { IPostResponse } from 'types/post.d'
import { readPosts } from '@services/posts.service'
import { useQuery } from 'react-query'

export const usePosts = () => {
  return useQuery<IPostResponse, Error>('posts', readPosts)
}
