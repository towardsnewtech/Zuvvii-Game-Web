import axios, { AxiosRequestConfig } from 'axios'
// import { getToken } from 'lib/token'
// import { setSessionExpired } from 'store/slices/app.slice'
import { store } from 'store'
import { setSessionExpired } from 'store/slices/app.slice'

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL

// set headers
const setHeaders = async () => {
  const session = store.getState().app.session

  const headers: {
    'Content-Type': string
    Authorization?: string
    SessionId?: string
  } = {
    'Content-Type': 'application/json'
  }
  if (session?.sessionId) {
    headers['SessionId'] = `${session?.sessionId}`
  }
  
  // force logout and session
  else if (store.getState().auth?.account) {
    sessionExpired()
  }
  axios.defaults.headers.common = headers
}

const sessionExpired = () => {
  store.dispatch(setSessionExpired())
}

// global api
const http = {
  async get(endpoint: string, config?: AxiosRequestConfig<any>) {
    // await setHeaders()

    try {
      const res = await axios.get(`${API_URL}${endpoint}`, config)
      return res
    } catch (e: any) {
      if (
        e &&
        e.response &&
        e.response.data &&
        e.response.data.status === 'invalid_token'
      ) {
        // sessionExpired()
      } else return {
        err: e,
      }
    }
  },
  async post(
    endpoint: string,
    params: any,
    config?: AxiosRequestConfig<any>
  ) {
    await setHeaders()

    try {
      const res = await axios.post(
        `${API_URL}${endpoint}`,
        params,
        config
      )
      return res
    } catch (e: any) {
      if (
        e &&
        e.response &&
        e.response.data &&
        e.response.data.status === 'invalid_token'
      ) {
        // sessionExpired()
      } else return {
        err: e
      }
    }
  },
  async put(
    endpoint: string,
    params: any,
    config?: AxiosRequestConfig<any>
  ) {
    // await setHeaders()

    try {
      const res = await axios.put(
        `${API_URL}${endpoint}`,
        params,
        config
      )
      return res
    } catch (e: any) {
      if (
        e &&
        e.response &&
        e.response.data &&
        e.response.data.status === 'invalid_token'
      ) {
        // sessionExpired()
      } else return e
    }
  },
  async patch(
    endpoint: string,
    params: any,

    config?: AxiosRequestConfig<any>
  ) {
    // await setHeaders()

    try {
      const res = await axios.patch(
        `${API_URL}${endpoint}`,
        params,
        config
      )
      return res
    } catch (e: any) {
      if (
        e &&
        e.response &&
        e.response.data &&
        e.response.data.status === 'invalid_token'
      ) {
        // sessionExpired()
      } else return e
    }
  },
  async delete(endpoint: string, config?: AxiosRequestConfig<any>) {
    // await setHeaders()

    try {
      const res = await axios.delete(`${API_URL}${endpoint}`, config)
      return res
    } catch (e: any) {
      if (
        e &&
        e.response &&
        e.response.data &&
        e.response.data.status === 'invalid_token'
      ) {
        // sessionExpired()
      } else return e
    }
  }
}

export default http
