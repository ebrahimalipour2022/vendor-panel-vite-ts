import type { AxiosError } from 'axios';

export interface ITokenData {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
}

export type OTPFormType = 'login-form' | 'otp-form';

export interface OtpFormValue {
  formMode: OTPFormType;
  mobile: string;
}
export interface ITokenDtoRes {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
}

export class IdpRequestError<T = any> {
  status!: number | string;
  code!: string;
  message!: T | string;
  constructor(error: AxiosError | any) {
    this.status = error?.response?.status;
    this.code = error?.response?.data?.error;
    this.message = error?.response?.data?.error_description;
  }
}

export interface ILoginReqDto {}
export interface ILoginResDto {}

export interface IChangePasswordReqDto {
  confirmPassword: string;
  newPassword: string;
  oldPassword: string;
}
export interface IChangePasswordResDto {}
