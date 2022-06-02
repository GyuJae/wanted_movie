import axios from 'axios'

import { ICreateAccountInput, ILoginInput } from 'types/users'

export const createAccount = (createAccountInput: ICreateAccountInput) => {
  return axios.post('/api/users', createAccountInput).then((res) => res.data)
}

export const login = (loginInput: ILoginInput) => {
  return axios.post('/api/users/login', loginInput).then((res) => res.data)
}

export const me = () => {
  return axios.get('/api/users/me').then((res) => res.data)
}
