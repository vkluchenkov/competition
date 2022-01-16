const BACKEND = "http://localhost:3001"

const axios = require('axios').default;

axios.interceptors.request.use((config: any) => {
  const token = window.localStorage.getItem('jwt');
  config.headers = config.headers || {};
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
})

interface LoginPayload {
  email: string;
  password: string;
}

interface ValidateCodePayload {
  email: string;
  code: string;
}

interface SetPassPayload {
  email: string;
  code: string;
  password: string;
}

// Festivals
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

// User
export const getUserData = () => {
  return axios.get(`${BACKEND}/users/data`)
    .then((result: any) => {
      return result.data
    })
}
export const login = (user: LoginPayload) => {
  return axios.post(`${BACKEND}/auth/login`, {
    "email": user.email,
    "password": user.password,
  })
    .then((result: any) => {
      return result.data.access_token
    })
}

export const signUp = (user: LoginPayload) => {
  return axios.post(`${BACKEND}/auth`, {
    "email": user.email,
    "password": user.password,
  })
    .then((result: any) => {
      return result.data.access_token
    })
}

// Password reset
export const requestPassReset = (email: string) => {
  return axios.post(`${BACKEND}/auth/reset`, { email })
    .then((result: any) => {
      return result.data
    })
}

export const validateResetCode = (data: ValidateCodePayload) => {
  return axios.post(`${BACKEND}/auth/resetcheck`, data)
    .then((result: any) => {
      return result.data
    })
}

export const setNewPassword = (data: SetPassPayload) => {
  return axios.post(`${BACKEND}/auth/setpass`, data)
    .then((result: any) => {
      return result.data.access_token
    })
}