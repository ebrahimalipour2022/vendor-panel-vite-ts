import { idpApi } from '@/redux/api/index';

export const authApi = idpApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<any, any>({
      query(body) {
        // console.log('rtk login body', body);
        return {
          method: 'POST',
          url: 'connect/token',
          data: {
            username: body?.username,
            password: body?.password,
            // captcha_code: body?.captcha?.captcha_code,
            grant_type: 'password',
            client_id: 'angular',
            scope: 'hasti_api offline_access profile',
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            // 'Content-Length': '137',
            // 'x-captcha-token': body?.captcha?.hash,
          },
        };
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
