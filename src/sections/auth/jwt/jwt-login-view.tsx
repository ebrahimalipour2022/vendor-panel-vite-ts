import { useState } from 'react';

import LoadingButton from '@mui/lab/LoadingButton';

// import { useTranslations } from 'next-intl';
import LoginWithUserPass from './LoginWithUserPass';

const Login = () => {
  // const t = useTranslations('authLogin');
  const [loginMethod, setLoginMethod] = useState('user-pass');

  const handleChangeForm = () => {
    if (loginMethod === 'user-pass') {
      setLoginMethod('otp');
    } else {
      setLoginMethod('user-pass');
    }
  };

  return (
    <>
      <LoginWithUserPass />
      {/* {loginMethod === 'user-pass' ? <LoginWithUserPass /> : <OtpLoginForm />} */}
      <div className="flex justify-center items-center flex-wrap gap-2">
        <LoadingButton fullWidth variant="text" onClick={handleChangeForm}>
          تست
          {/* {loginMethod !== 'otp' ? t('login_with_otp') : t('login_with_password')} */}
        </LoadingButton>
      </div>
    </>
  );
};

export default Login;
