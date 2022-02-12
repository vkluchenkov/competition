import { Registration } from "../components/EventDww/types";
import { Festival } from "../models/festival";
import { Order } from "../pages/Order/types";
import { LoginPayload, ValidateEmailPayload, ValidateCodePayload, SetUserPayload, SetOrderPayload } from "./types";

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


// Festivals
export const getFestival = (festivalUrl: string | undefined): Festival => {
  return axios.get(`${BACKEND}/festivals/${festivalUrl}`)
    .then((result: any) => {
      return result.data
    })
}

export const getFestivalById = (festivalId: number) => {
  return axios.get(`${BACKEND}/festivals/${festivalId}/data`)
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

// Signup
export const signUpRequest = (email: ValidateEmailPayload) => {
  return axios.post(`${BACKEND}/auth/signup`, { email })
    .then((result: any) => {
      return result.data
    })
}

export const signUpValidateCode = (data: ValidateCodePayload) => {
  return axios.post(`${BACKEND}/auth/validate`, data)
    .then((result: any) => {
      return result.data
    })
}

export const signUpCreate = (data: SetUserPayload) => {
  return axios.post(`${BACKEND}/auth/create`, data)
    .then((result: any) => {
      return result.data.access_token
    })
}

// Password reset
export const requestPassReset = (email: ValidateEmailPayload) => {
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

export const setNewPassword = (data: SetUserPayload) => {
  return axios.post(`${BACKEND}/auth/setpass`, data)
    .then((result: any) => {
      return result.data.access_token
    })
}

// Order
export const getOrder = (id: string): Order => {
  return axios.get(`${BACKEND}/orders/${id}`)
    .then((result: any) => {
      return result.data
    })
}

export const getOrderByUser = (): Order => {
  return axios.get(`${BACKEND}/orders`)
    .then((result: any) => {
      return result.data
    })
}

export const setOrder = (data: SetOrderPayload) => {
  return axios.post(`${BACKEND}/festivals/register`, data)
    .then((result: any) => {
      return result.data
    })
}

// Registration
export const getRegistrationByFestival = (festivalId: number): Registration => {
  return axios.get(`${BACKEND}/festivals/${festivalId}/registration`)
    .then((result: any) => {
      return result.data
    })
}