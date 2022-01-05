const BACKEND = "http://localhost:3001"

const axios = require('axios').default;

interface LoginPayload {
  email: string;
  password: string;
}

export const getFestival = (festivalUrl: string | undefined) => {
  return axios.get(`${BACKEND}/festivals/${festivalUrl}`)
    .then((result: any) => {
      return result.data
    })
}

export const getWorkshops = (festivalId: number) => {
  return axios.get(`${BACKEND}/festivals/${festivalId}/workshops`)
    .then((result: any) => {
      return result.data
    })
}

export const getFestivals = () => {
  return axios.get(`${BACKEND}/festivals`)
    .then((result: any) => {
      return result.data
    })
}

export const login = (user: LoginPayload) => {
  return axios.post(`${BACKEND}/users/login`, {
    "email": user.email,
    "password": user.password,
  })
    .then((result: any) => {
      return result.data
    })
}
