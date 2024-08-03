import { useState } from 'react';

import axios from 'axios';

import { toast } from 'react-toastify';

import { useTranslation } from 'react-i18next';
import type { OtpFormValue } from '@/types';
import { OTP_TIMER } from '@/utils/timer';
import VerifyCodeForm from './VerifyCodeForm';
import OtpLoginForm from './OtpLoginForm';

const LoginWithOtp = () => {
  const { t } = useTranslation();
  const [otpFormState, setOtpFormState] = useState<OtpFormValue>({
    formMode: 'login-form',
    mobile: '',
  });
  const [timerDone, setTimerDone] = useState<boolean>(!OTP_TIMER);

  const onSendCode = async (data: { username: string }) => {
    if (data?.username) {
      await axios(`${import.meta.env.VITE_IDP_API_URL}/api/OneTimePassword/Send/${data.username}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
      })
        .then((res) => {
          toast.success(t('toast.sendCodeSuccessfully'), { toastId: 'send-code-success-toast' });
          setTimerDone(!OTP_TIMER);

          if (onChangeForm && otpFormState.formMode === 'login-form') {
            onChangeForm({ formMode: 'otp-form', mobile: data.username });
          }
        })
        .catch((err) => {
          toast.error(err?.response?.data?.error_description || t('toast.sendCodeFailed'), {
            toastId: 'send-code-error-toast',
          });
        });
    }
  };

  const onChangeForm = (value: OtpFormValue) => {
    setOtpFormState(value);
  };

  if (otpFormState.formMode === 'login-form') {
    return <OtpLoginForm onSendCode={onSendCode} />;
  }

  return (
    <VerifyCodeForm
      otpFormState={otpFormState}
      onSendCode={onSendCode}
      timerDone={timerDone}
      setTimerDone={setTimerDone}
    />
  );
};

export default LoginWithOtp;
