import { useState } from 'react';

import LoadingButton from '@mui/lab/LoadingButton';

import { useTranslation } from 'react-i18next';
import Stack from '@mui/material/Stack';
import LoginWithOtp from '@/sections/auth/jwt/LoginWithOtp';
import LoginWithUserPass from '@/sections/auth/jwt/LoginWithUserPass';

const Login = () => {
  const { t } = useTranslation();
  const [loginMethod, setLoginMethod] = useState('otp');

  const handleChangeForm = () => {
    if (loginMethod === 'user-pass') {
      setLoginMethod('otp');
    } else {
      setLoginMethod('user-pass');
    }
  };

  return (
    <>
      {loginMethod === 'user-pass' ? <LoginWithUserPass /> : <LoginWithOtp />}
      <Stack
        gap={2}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <LoadingButton fullWidth variant="text" onClick={handleChangeForm}>
          {loginMethod !== 'otp'
            ? t('authLogin.login_with_otp')
            : t('authLogin.login_with_password')}
        </LoadingButton>
      </Stack>
    </>
  );
};

export default Login;
