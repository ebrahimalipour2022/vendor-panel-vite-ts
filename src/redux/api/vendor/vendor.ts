import { vendorApi } from '@/redux/api';
import { IStore } from '@/types';

const VITE_VM_API_VERSION = import.meta.env.VITE_VM_API_VERSION;
const controller = `${VITE_VM_API_VERSION}/vendor/store/`;
export const orderAddress = vendorApi.injectEndpoints({
  endpoints: (builder) => ({
    getActiveStore: builder.query<IStore, void>({
      query() {
        return {
          method: 'GET',
          url: `${controller}active`,
        };
      },
      // transformResponse: (response: { orderAddress: IOrderAddress[] }) => {
      //   return response?.orderAddress || [];
      // },
    }),
  }),
});

export const { useLazyGetActiveStoreQuery, useGetActiveStoreQuery } = orderAddress;
