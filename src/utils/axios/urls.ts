const idp_endpoint = process.env.VITE_IDP_API_URL || 'https://dev-idp.zap-express.com';
const um_endpoint = process.env.VITE_UM_API_URL || 'https://dev-um.zap-express.com';
const vm_endpoint = process.env.VITE_VM_API_URL || 'https://dev-vm.zap-express.com';

const id_version = '/api';
const um_version = '/api/v1';
const vm_version = '/api/v1';

const Urls = {
  umFullApi() {
    return um_endpoint + um_version;
  },

  vmFullApi() {
    return vm_endpoint + vm_version;
  },

  login() {
    return `${idp_endpoint}/connect/token`;
  },

  // otpLogin() {
  //   return `${idp_endpoint + id_version}/OneTimePassword/Send`;
  // }

  // verifyCode() {
  //   // https://api.zap-express.com/um/api/v1/User/SendVerificationSmsForResetPassword
  // }

  changePassword() {
    return `${this.umFullApi()}/Customer/ChangePassword`;
  },

  userInfo() {
    return `${this.umFullApi()}/Customer/CustomerGeneralInfo`;
  },

  // vendor panel
  orderAddress() {
    return `${this.vmFullApi()}/OrderAddress/store`;
  },
};
export default Urls;
