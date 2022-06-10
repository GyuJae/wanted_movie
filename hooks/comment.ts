import { ICommentResponse } from 'types/comment'
import { readComments } from 'services/comments.service'
import { useInfiniteQuery } from 'react-query'

export const useInfiniteComments = (postId: number) => {
  return useInfiniteQuery<ICommentResponse, Error>(
    ['community', 'comments', postId],
    ({ pageParam = 1 }) => readComments({ pageParam, postId }),
    {
      getNextPageParam: (lastPage: ICommentResponse) => {
        if (!lastPage.page || !lastPage.totalPage || !lastPage) return undefined
        if (lastPage.page < lastPage.totalPage) return lastPage.page + 1
        return undefined
      },
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,
      retry: 1,
    }
  )
}
