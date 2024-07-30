// MUI Imports
import Stack from '@mui/material/Stack';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import LoadingButton from '@mui/lab/LoadingButton';
import FormHelperText from '@mui/material/FormHelperText';

// Third-party Imports
import type { SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';

// Hook Imports
// import { useTranslations } from 'next-intl';
// Util Imports
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { YupValidators } from '@/utils/forms-validation';
// import CountDown from '@components/time-count-down';
import Box from '@mui/material/Box';
import { OtpFormValue } from '@/types';
import { useTranslation } from 'react-i18next';
import CountDown from '@/components/time-count-down';

// import type { OtpFormValue } from '@/types/auth/auth';

interface FormData {
  verificationCode: string;
  mobile?: string;
}

type Props = {
  timerDone?: boolean;
  otpFormState?: OtpFormValue;
  setTimerDone?: (value: boolean) => void;
  onSendCode?: (data: { username: string }) => Promise<void>;
};

const OTP_TIMER = 120;

const VerifyCodeForm = ({ onSendCode, otpFormState, timerDone, setTimerDone }: Props) => {
  const { t } = useTranslation();
  // Hooks
  // const router = useRouter();
  // const searchParams = useSearchParams();

  const resolver = yupResolver(
    Yup.object().shape({
      verificationCode: YupValidators().otp,
    })
  );

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver,
    defaultValues: {
      verificationCode: '',
    },
  });

  const onResendCode = () => {
    if (otpFormState?.mobile) {
      if (onSendCode) {
        onSendCode({ username: otpFormState.mobile });
      }
    }
  };

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    // const res = await signIn('credentials', {
    //   email: otpFormState?.mobile,
    //   verificationCode: data.verificationCode,
    //   method: 'otp',
    //   redirect: false,
    // });
    //
    // if (res && res.ok && res.error === null) {
    //   // Vars
    //   const redirectURL = searchParams.get('redirectTo') ?? '/';
    //
    //   router.replace(redirectURL);
    // } else if (res?.error) {
    //   toast.error(t('toast.unauthorized'));
    // }
  };

  return (
    <form noValidate method="post" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <Stack gap={5}>
        <Controller
          name="verificationCode"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Stack spacing={1.7}>
              <FormLabel required error={!!errors.verificationCode} disabled={isSubmitting}>
                {t('authOTP.enter_otp_code', { value: otpFormState?.mobile || '' })}
              </FormLabel>
              <OutlinedInput
                {...field}
                fullWidth
                autoFocus
                disabled={isSubmitting}
                type="text"
                placeholder={t('authOTP.otp_placeholder')}
                onChange={(e) => {
                  const value = e.target.value;

                  field.onChange(value);

                  if (value.length === 5) {
                    handleSubmit(onSubmit)();
                  }
                }}
                inputProps={{
                  maxLength: 5,
                }}
                {...(errors.verificationCode && {
                  error: true,
                })}
                endAdornment={
                  !timerDone ? (
                    <Box
                      sx={{
                        p: 2,
                        bgcolor: 'white',
                        borderRadius: '1rem',
                      }}
                    >
                      <CountDown
                        timer={OTP_TIMER}
                        doneHandler={() => (!timerDone && setTimerDone ? setTimerDone(true) : null)}
                      />
                    </Box>
                  ) : null
                }
              />
              {errors?.verificationCode?.message && (
                <FormHelperText error>{errors.verificationCode.message}</FormHelperText>
              )}
            </Stack>
          )}
        />

        <LoadingButton fullWidth variant="contained" type="submit" loading={isSubmitting}>
          {t('authLogin.login_to', { value: t('brandTitle') })}
        </LoadingButton>
        <LoadingButton
          fullWidth
          variant="text"
          type="button"
          loading={isSubmitting}
          disabled={!timerDone}
          onClick={onResendCode}
        >
          {t('authOTP.resend_code')}
        </LoadingButton>
      </Stack>
    </form>
  );
};

export default VerifyCodeForm;
