import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { i18n } from '@/locales/i18n';
import { Mutex } from 'async-mutex';
import { BaseQueryFn, createApi, FetchBaseQueryError, retry } from '@reduxjs/toolkit/query/react';
import { toast } from 'react-toastify';
import { logout, setTokens, getTokens } from '@/utils/token';
import { getNormalizedErrorMessage } from '@/utils/error';

const mutex = new Mutex();

type ENDPOINT_TYPE = 'IDP_ENDPOINT' | 'UM_ENDPOINT' | 'VENDOR_ENDPOINT';

const IDP_ENDPOINT = import.meta.env.VITE_IDP_API_URL;
const UM_ENDPOINT = import.meta.env.VITE_UM_API_URL;
const VENDOR_ENDPOINT = import.meta.env.VITE_VM_API_URL;

// vendor panel axios instances
const vendorAxiosInstance = axios.create({
  baseURL: VENDOR_ENDPOINT,
  headers: {
    // Authorization: 'Bearer ' + getTokens()?.access_token,
  },
  validateStatus(status) {
    return status >= 200 && status < 300;
  },
});

//user management [customerGeneralInfo]
const umAxiosInstance = axios.create({
  baseURL: UM_ENDPOINT,
  headers: {
    // Authorization: 'Bearer ' + getTokens()?.access_token,
  },
  validateStatus(status) {
    return status >= 200 && status < 300;
  },
});

function refreshTokenPromise(): Promise<AxiosResponse<any, any>> {
  const refresh_token = getTokens()?.refresh_token;
  if (!refresh_token) {
    return Promise.reject('no refresh token');
  }
  return axios.post(
    `${IDP_ENDPOINT}/connect/token`,
    {
      refresh_token,
      grant_type: 'refresh_token',
      client_id: 'angular',
    },
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Content-Length': '137',
      },
    }
  );
}
const axiosBaseQuery = (
  endpoint_type: ENDPOINT_TYPE
): BaseQueryFn<AxiosRequestConfig, unknown, FetchBaseQueryError> =>
  retry(
    async (args, api, extraOptions) => {
      await mutex.waitForUnlock();
      let result;
      try {
        if (endpoint_type === 'UM_ENDPOINT') {
          const { data } = await umAxiosInstance(args);
          result = { data };
        } else {
          const { data } = await vendorAxiosInstance(args);
          result = { data };
        }
      } catch (e: any) {
        //TODO: change to new error object and download file if listFiles[]
        //TODO: error 603 related to reset-password um services
        if (e?.response?.status === 400 || e?.response?.status === 603) {
          const message = getNormalizedErrorMessage(e?.response?.data);
          if (message) {
            toast.error(message, { toastId: 'TOAST_ID_ERROR_400' });
          }
        }
        // if (e?.response?.status === 500 || e?.response?.status > 500) {
        if (e?.response?.status === 500) {
          toast.error(i18n.t('toast.serverError'), { toastId: 'TOAST_ID_ERROR_500' });
        }
        if (e?.response?.status === 401) {
          const refresh_token = getTokens()?.refresh_token;
          if (!mutex.isLocked()) {
            const release = await mutex.acquire();
            try {
              if (refresh_token) {
                const { data } = await refreshTokenPromise();
                if (data?.access_token) {
                  setTokens({
                    access_token: data.access_token,
                    refresh_token: data?.refresh_token,
                    expires_in: data?.expires_in,
                    token_type: data?.token_type,
                  });
                  result = axiosBaseQuery(endpoint_type)(args, api, extraOptions);
                }
              }
            } catch (e) {
              logout();
            } finally {
              // release must be called once the mutex should be released again.
              release();
            }
          } else {
            await mutex.waitForUnlock();
            result = axiosBaseQuery(endpoint_type)(args, api, extraOptions);
          }
        }
        result = {
          error: {
            status: e?.response?.status,
            data: e?.response?.data || e.message,
          },
        };
      }
      return result;
    },
    {
      maxRetries: 3,
    }
  );

const vendorApi = createApi({
  baseQuery: axiosBaseQuery('VENDOR_ENDPOINT'),
  reducerPath: 'VENDOR_ENDPOINT',
  tagTypes: [],
  endpoints: () => ({}),
});
const umApi = createApi({
  baseQuery: axiosBaseQuery('UM_ENDPOINT'),
  reducerPath: 'UM_ENDPOINT',
  tagTypes: ['UserProfilePhoto'],
  endpoints: () => ({}),
});
export { vendorApi, umApi, vendorAxiosInstance, umAxiosInstance };
