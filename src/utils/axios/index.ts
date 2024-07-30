// src/lib/authFetcher.js
import type { CreateAxiosDefaults } from 'axios';
import axios from 'axios';

import { toast } from 'react-toastify';

import { getNormalizedErrorMessage } from '@/utils/error';

const serverError = 'در انجام درخواست مشکلی پیش آمده است. لطفا مجدد تلاش نمائید';

const axiosInstance = axios.create({
  // baseURL: 'https://api.example.com'
  validateStatus(status) {
    return status >= 200 && status < 300; // default
  },
});

// axiosInstance.interceptors.response.use(
//   response => response.data,
//   error => Promise.reject(error.response?.data || error.message)
// )

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (err) {
    const { config, response } = err;

    let status;
    const isServer = typeof window === 'undefined';

    if (response) {
      status = response.status;
    } else {
      if (!isServer) {
        toast.error(serverError, { toastId: 'status-server-error' });
      }

      return Promise.reject(err);
    }

    const originalRequest = config;

    console.log('status', status);

    if (status === 400) {
      if (!isServer) {
        const error = getNormalizedErrorMessage(response);

        if (error) {
          toast.error(error, { toastId: 'status-error-400' });
        }
      }

      return Promise.reject(err);
    }

    // error 500
    if (status > 499 && status <= 599) {
      if (!isServer) {
        toast.error(serverError, { toastId: 'status-server-error-500' });
      }

      return Promise.reject(err);
    }

    // used in um api
    if (status > 600) {
      if (!isServer) {
        const error = getNormalizedErrorMessage(response);

        if (error) {
          toast.error(error, { toastId: 'status-error-600' });
        } else {
          toast.error(serverError, { toastId: 'status-server-error-600' });
        }
      }

      return Promise.reject(err);
    }

    // if (status === 401 && !originalRequest._retry) {
    //   try {
    //     originalRequest._retry = true
    //     const result = await refreshAccessToken()
    //
    //     setCookie('accToken', result?.access_token)
    //     setCookie('refToken', result?.refresh_token)
    //     originalRequest.headers['Authorization'] = 'Bearer ' + result?.accessToken
    //
    //     return axiosInstance(originalRequest)
    //   } catch (err) {
    //     return Promise.reject(err)
    //   }
    // }

    return Promise.reject(err);
  }
);

axiosInstance.interceptors.request.use(
  function (config) {
    config.headers['Content-Type'] = 'application/json';

    return config;
  },
  (error) => Promise.reject(error)
);

const axiosAuthFetcher = async (url: string, axiosConfig: CreateAxiosDefaults) => {
  let token;

  // Client-side fetching
  // const session = await getToken();

  if (!token) {
    throw new Error('Not authenticated');
  }

  return axiosInstance(url, {
    ...axiosConfig,
    // @ts-ignore
    headers: {
      ...axiosConfig.headers,
      Authorization: `Bearer ${token}`,
    },
  });
};

export default axiosAuthFetcher;

export const API_ENDPOINTS = {
  chat: '/api/chat',
  kanban: '/api/kanban',
  calendar: '/api/calendar',
  auth: {
    me: '/api/auth/me',
    login: '/api/auth/login',
    register: '/api/auth/register',
  },
  mail: {
    list: '/api/mail/list',
    details: '/api/mail/details',
    labels: '/api/mail/labels',
  },
  post: {
    list: '/api/post/list',
    details: '/api/post/details',
    latest: '/api/post/latest',
    search: '/api/post/search',
  },
  product: {
    list: '/api/product/list',
    details: '/api/product/details',
    search: '/api/product/search',
  },
};
