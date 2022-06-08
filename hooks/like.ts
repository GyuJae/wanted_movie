import { readLike } from '@services/like.service'
import { useQuery } from 'react-query'

import { ILikeResponse, IToggleLikeInput } from 'types/like'

export const useIsLike = ({ postId }: IToggleLikeInput) => {
  return useQuery<ILikeResponse, Error>(['like', postId], () => readLike({ postId }))
}
