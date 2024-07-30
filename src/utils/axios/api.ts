import urls from '@/utils/axios/urls';
import { IChangePasswordReqDto, IOrderAddress, IOrderAddressListReq } from '@/types';
import axiosInstance from '@/utils/axios/index';

export const authAPI = {
  changePasswordApi: async (data: IChangePasswordReqDto) => {
    return await axiosInstance(urls.changePassword(), {
      method: 'PUT',
      data,
    });
  },
};
export const umAPI = {
  userInfoAxios: async () => {
    try {
      const res = await axiosInstance(urls.userInfo(), {
        method: 'GET',
      });

      return res.data;
    } catch (err: unknown) {
      console.log(err);
    }
  },
};
export const vmAPI = {
  getStoreAddress: async ({ id, query }: IOrderAddressListReq): Promise<IOrderAddress[]> => {
    const res = await axiosInstance(`${urls.orderAddress()}/${id}`, {
      method: 'GET',
      params: query,
    });

    if (res?.data?.orderAddress) {
      return res.data.orderAddress;
    }

    return [];
  },
};
