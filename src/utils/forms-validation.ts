import * as Yup from 'yup';
import { i18n } from '@/locales/i18n';
// import {
//   NATIONAL_CODE_LENGTH,
//   OTP_LENGTH,
//   PASSWORD_MAX_LENGTH,
//   PASSWORD_MIN_LENGTH,
//   USERNAME_MAX_LENGTH,
//   USERNAME_MIN_LENGTH
// } from '@/core/config'

export const regex = {
  username: /^[a-z][a-z0-9]{2,19}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&])[A-Za-z\d!@#$%^&]{8,30}$/,
  mobile: /^09\d{9}$/,
  phone: /^0\d$/,
  persian: /^[۰-۹0-9\u0600-\u06FF\s]+$/,
  english: /^[a-zA-Z0-9]*$/,
};

export const YupValidators = () => ({
  mobile: Yup.string()
    .required(i18n.t('formCommonErrors.isRequired'))
    .typeError(i18n.t('formCommonErrors.telNumber'))
    .max(11, i18n.t('formCommonErrors.telNumber'))
    .trim()
    .matches(regex.mobile, i18n.t('formCommonErrors.telNumber')),
  password: Yup.string()
    .required(i18n.t('formCommonErrors.isRequired'))
    .min(3, i18n.t('formCommonErrors.inputLengthMin', { min: 3 }))
    .max(20, i18n.t('formCommonErrors.inputLengthMax', { max: 20 }))
    .trim(),
  otp: Yup.string()
    .required(i18n.t('formCommonErrors.isRequired'))
    .length(5, i18n.t('formCommonErrors.inputLength', { length: 5 })),
  stringRequired: Yup.string()
    .typeError(i18n.t('formCommonErrors.isRequired'))
    .required(i18n.t('formCommonErrors.isRequired')),
  // username: Yup.string()
  //   .required(i18n.t('formCommonErrors.isRequired'))
  //   .typeError(i18n.t('formCommonErrors.isRequired'))
  //   .min(USERNAME_MIN_LENGTH, i18n.t('auth.error.minCharactersUsername', { value: USERNAME_MIN_LENGTH }))
  //   .max(USERNAME_MAX_LENGTH, i18n.t('auth.error.maxCharactersUsername', { value: USERNAME_MAX_LENGTH }))
  //   .trim()
  //   .matches(regex.username, i18n.t('formCommonErrors.usernameRegexError'))
  // // .matches(regex.password, i18n.t('formCommonErrors.passwordRegexError')),
  // phone: Yup.string()
  //   .required(i18n.t('formCommonErrors.isRequired'))
  //   .typeError(i18n.t('formCommonErrors.telNumber'))
  //   .max(11, i18n.t('formCommonErrors.telNumber'))
  //   .trim()
  //   .matches(regex.phone, i18n.t('formCommonErrors.telNumber')),
  // email: Yup.string().required(i18n.t('formCommonErrors.isRequired')).max(150).email().trim(),
  // captcha: Yup.object()
  //   .shape({
  //     answer: Yup.number()
  //       .typeError(i18n.t('auth.error.captcha'))
  //       .required(i18n.t('formCommonErrors.isRequired')),
  //     hash: Yup.string().required(i18n.t('formCommonErrors.isRequired')),
  //   })
  //   .nullable(),
  // nationalCode: Yup.string()
  //   .required(i18n.t('formCommonErrors.isRequired'))
  //   .typeError(i18n.t('formCommonErrors.isRequired'))
  //   .length(NATIONAL_CODE_LENGTH, i18n.t('formCommonErrors.NationalIdNotValid')),
  // foreignCode: Yup.string()
  //   .required(i18n.t('formCommonErrors.isRequired'))
  //   .typeError(i18n.t('formCommonErrors.isRequired'))
  //   .length(12, i18n.t('formCommonErrors.isRequired')),
  // stringOptional: Yup.string()
  //   .typeError(i18n.t('formCommonErrors.isRequired'))
  //   .nullable(i18n.t('formCommonErrors.isRequired')),

  // stringRequiredWithLength: (length: number) =>
  //   Yup.string()
  //     .typeError(i18n.t('formCommonErrors.isRequired'))
  //     .required(i18n.t('formCommonErrors.isRequired'))
  //     .length(length, i18n.t('formCommonErrors.inputLength', { length })),
  // numberRequired: Yup.number()
  //   .typeError(i18n.t('formCommonErrors.isRequired'))
  //   .required(i18n.t('formCommonErrors.isRequired')),
  // mixedRequired: Yup.mixed()
  //   .required(i18n.t('formCommonErrors.isRequired'))
  //   .nullable(i18n.t('formCommonErrors.isRequired')),
  // persianStringRequired: Yup.string()
  //   .required(i18n.t('formCommonErrors.isRequired'))
  //   .typeError(i18n.t('formCommonErrors.isRequired'))
  //   .matches(regex.persian, i18n.t('formCommonErrors.justPersianRegexError'))
  //   .nullable(i18n.t('formCommonErrors.isRequired')),
  // booleanRequired: Yup.boolean().oneOf([true, false], i18n.t('formCommonErrors.isRequired')),
  // photo: Yup.mixed()
  //     .required('Photo is is required')
  //     .test('fileFormat', 'Unsupported Format', (value) => value && FILE_FORMATS.includes(value.type))
  //     .test(
  //         'fileSize',
  //         `File must be less than or equal to ${fData(MAX_FILE_SIZE)}`,
  //         (value) => value && value.size <= MAX_FILE_SIZE
  //     ),
  // age: Yup.number()
  //     .required('Age is required')
  //     .positive('Age must be a positive number')
  //     .integer()
  //     .moreThan(18, 'Age must be greater than or equal to 18')
  //     .lessThan(120, 'Age must be less than or equal to 120'),
  // startDate: Yup.date().nullable().required('Start date is required'),
  // endDate: Yup.date()
  //     .required('End date is required')
  //     .nullable()
  //     .min(Yup.ref('startDate'), 'End date must be later than start date'),
  // password: Yup.string().required('Password is required').min(6, 'Password should be of minimum 6 characters length'),
  // confirmPassword: Yup.string()
  //     .required('Confirm password is required')
  //     .oneOf([Yup.ref('password')], "Password's not match"),
  // avatarUrl: Yup.mixed().test('required', 'Avatar is required', (value) => value !== ''),
  // images: Yup.array().min(1, 'Images is required'),
});
