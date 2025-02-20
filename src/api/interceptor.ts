import axios, { AxiosHeaders } from 'axios';

// Add a request interceptor
axios.interceptors.request.use(
    async config => {
      const secureToken = '';
      if (secureToken) {
        config.headers['Authorization'] = 'Bearer ' + secureToken
      }
      // config.headers['Content-Type'] = 'application/json';
      return config
    },
    error => {
      Promise.reject(error)
    }
  )