import { vendorApi } from '@/redux/api';
import { IOrderAddress, IOrderAddressListReq } from '@/types';
// import { convertBase64ToFile } from '@/services/driver-files';

//https://dev-vm.zap-express.com/api/v1/OrderAddress/store/100?query=
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
    }),
  }),
});

export const { useLazyGetOrderAddressesQuery } = orderAddress;
