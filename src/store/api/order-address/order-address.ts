import { vendorApi } from '@/store/api';
import { IOrderAddress, IOrderAddressListReq } from '@/types';

const VITE_VM_API_VERSION = import.meta.env.VITE_VM_API_VERSION;
const controller = `${VITE_VM_API_VERSION}/`;
export const orderAddress = vendorApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrderAddresses: builder.query<IOrderAddress[], IOrderAddressListReq>({
      query({ id, query }) {
        return {
          method: 'GET',
          url: `${controller}OrderAddress/store/${id}?query=${query}`,
        };
      },
      transformResponse: (response: { orderAddress: IOrderAddress[] }) => {
        return response?.orderAddress || [];
      },
      providesTags: ['ORDER-ADDRESSES'],
    }),
    postOrderAddresses: builder.mutation<void, IOrderAddress>({
      query(data) {
        return {
          method: 'POST',
          url: `${controller}OrderAddress`,
          data,
        };
      },
      invalidatesTags: ['ORDER-ADDRESSES'],
    }),
    putOrderAddresses: builder.mutation<void, { id?: number | string; data: IOrderAddress }>({
      query({ id, data }) {
        return {
          method: 'PUT',
          url: `${controller}OrderAddress/${id}`,
          data,
        };
      },
      invalidatesTags: ['ORDER-ADDRESSES'],
    }),
    deleteOrderAddresses: builder.mutation<void, { id: number }>({
      query({ id }) {
        return {
          method: 'DELETE',
          url: `${controller}OrderAddress/${id}`,
        };
      },
      invalidatesTags: ['ORDER-ADDRESSES'],
    }),
  }),
});

export const {
  useLazyGetOrderAddressesQuery,
  usePostOrderAddressesMutation,
  usePutOrderAddressesMutation,
  useDeleteOrderAddressesMutation,
} = orderAddress;
