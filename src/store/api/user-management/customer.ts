import { umApi } from '@/store/api';
import { ICustomerGeneralInfo } from '@/types';
// import { convertBase64ToFile } from '@/services/driver-files';

const VITE_UM_API_VERSION = import.meta.env.VITE_UM_API_VERSION;
const controller = `${VITE_UM_API_VERSION}/Customer/`;
export const customer = umApi.injectEndpoints({
  endpoints: (builder) => ({
    customerGeneralInfo: builder.query<ICustomerGeneralInfo, void>({
      query() {
        return {
          method: 'GET',
          url: `${controller}CustomerGeneralInfo`,
        };
      },
    }),
    // getUserProfilePhoto: builder.query<File | undefined, void>({
    //   query() {
    //     return {
    //       method: 'GET',
    //       url: `${controller}DownloadCurrentUserProfilePhoto?thumbnail=false`,
    //     };
    //   },
    //   transformResponse: (response: { base64Image: any }) => {
    //     const base64 = convertBase64ToFile(response?.base64Image, `profile.png`, 'image/png');
    //     if (base64) {
    //       Object.assign(base64, {
    //         preview: URL.createObjectURL(base64),
    //       });
    //       return base64;
    //     }
    //   },
    //   providesTags: ['UserProfilePhoto'],
    // }),
    // putUserProfilePhoto: builder.mutation<void, string>({
    //   query(data) {
    //     return {
    //       method: 'PUT',
    //       url: `${controller}ChangeProfilePhoto`,
    //       data,
    //       headers: {
    //         'Content-Type': 'application/json-patch+json',
    //       },
    //     };
    //   },
    //   invalidatesTags: ['UserProfilePhoto'],
    // }),
  }),
});

export const {
  useCustomerGeneralInfoQuery,
  useLazyCustomerGeneralInfoQuery,
  // usePutUserProfilePhotoMutation,
  // useLazyGetUserProfilePhotoQuery,
  // useGetUserProfilePhotoQuery,
} = customer;

//download user profile photo
// GET
// https://dev-um.zap-express.com/api/v1/Customer/DownloadCurrentUserProfilePhoto?thumbnail=false

//change user profile photo
// input as base64
// example :  "sdklfjllskjfklsjdfksjlfjslkdfjlskjdfsdjf"
// PUT
// https://dev-um.zap-express.com/api/v1/Customer/ChangeProfilePhoto
