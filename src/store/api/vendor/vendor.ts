import { vendorApi } from '@/store/api';
import { IOrderAddress, IStore, StateOption } from '@/types';

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
    }),
    getAllActiveStores: builder.query<StateOption[], void>({
      query() {
        return {
          method: 'GET',
          url: `${controller}allactive`,
        };
      },
      transformResponse: (response: IStore[]) => {
        console.log('res is', response);
        if (response?.length && Array.isArray(response)) {
          return response.map((item) => ({
            value: (item?.storeId && item?.storeId.toString()) || '',
            label: item?.title || '-----',
          }));
        }
        return [];
      },
    }),
  }),
});

export const {
  useLazyGetActiveStoreQuery,
  useGetActiveStoreQuery,
  useLazyGetAllActiveStoresQuery,
  useGetAllActiveStoresQuery,
} = orderAddress;
