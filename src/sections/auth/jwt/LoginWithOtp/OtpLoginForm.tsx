// MUI Imports
import Stack from '@mui/material/Stack';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import LoadingButton from '@mui/lab/LoadingButton';
import FormHelperText from '@mui/material/FormHelperText';

// Third-party Imports
import { Controller, useForm } from 'react-hook-form';

// Hook Imports

// Util Imports
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { YupValidators } from '@/utils/forms-validation';
import { useTranslation } from 'react-i18next';

interface FormData {
  username: string;
}

const OtpLoginForm = ({ onSendCode }: { onSendCode: (data: FormData) => Promise<void> }) => {
  const { t } = useTranslation();

  const resolver = yupResolver(
    Yup.object().shape({
      username: YupValidators().mobile,
    })
  );

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver,
    defaultValues: {
      username: '',
    },
  });

  return (
    <>
      <form noValidate method="post" autoComplete="off" onSubmit={handleSubmit(onSendCode)}>
        <Stack flexDirection={'column'} gap={5}>
          <Controller
            name="username"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Stack spacing={1.7}>
                <FormLabel required error={!!errors.username} disabled={isSubmitting}>
                  {t('authLogin.mobile')}
                </FormLabel>
                <OutlinedInput
                  {...field}
                  fullWidth
                  autoFocus
                  type="text"
                  placeholder={t('authLogin.mobile')}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    // errorState !== null && setErrorState(null)
                  }}
                  disabled={isSubmitting}
                  inputProps={{
                    maxLength: 11,
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                  }}
                  {...(errors.username && {
                    error: true,
                  })}
                />
                {errors?.username?.message && (
                  <FormHelperText error>{errors.username.message}</FormHelperText>
                )}
              </Stack>
            )}
          />
          <LoadingButton fullWidth variant="contained" type="submit" loading={isSubmitting}>
            {t('authLogin.login_to', { value: t('brandTitle') })}
          </LoadingButton>
        </Stack>
      </form>
    </>
  );
};

export default OtpLoginForm;
