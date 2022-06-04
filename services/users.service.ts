import axios from 'axios'

import { ICreateAccountInput, IEditProfileInput, ILoginInput } from '../types/users.d'

export const createAccount = (createAccountInput: ICreateAccountInput) => {
  return axios.post('/api/users', createAccountInput).then((res) => res.data)
}

export const login = (loginInput: ILoginInput) => {
  return axios.post('/api/users/login', loginInput).then((res) => res.data)
}

export const logout = () => {
  return axios.post('/api/users/logout').then((res) => res.data)
}

export const me = () => {
  return axios.get('/api/users/me').then((res) => res.data)
}

export const edit = (editProfilInput: IEditProfileInput) => {
  return axios.post('/api/users/me/edit', editProfilInput).then((res) => res.data)
}
