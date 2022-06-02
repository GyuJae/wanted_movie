import { IMeResponse } from 'types/users'
import { me } from '@services/users.service'
import { useQuery } from 'react-query'

export const useMe = () => {
  return useQuery<IMeResponse, Error>(['user', 'me'], me)
}
