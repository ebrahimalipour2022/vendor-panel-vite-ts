// Next Imports
// import { useRouter, useSearchParams } from 'next/navigation';

// MUI Imports
import Stack from '@mui/material/Stack';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import LoadingButton from '@mui/lab/LoadingButton';
import FormHelperText from '@mui/material/FormHelperText';

// Third-party Imports
// import { signIn } from 'next-auth/react'
import type { SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';
// import { toast } from 'react-toastify'
// Hook Imports
// import { useTranslations } from 'next-intl'
// Util Imports
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import RHFPasswordField from '@/components/hook-form/RHFPasswordInput';
import { useTranslation } from 'react-i18next';

// import { YupValidators } from '@/utils/forms-validation'
// import RHFPasswordField from '@core/components/hook-form/RHFPasswordInput'

interface FormData {
  username: string;
  password: string;
}

const LoginWithUserPass = () => {
  // Hooks
  const { t } = useTranslation();
  // const router = useRouter();
  // const searchParams = useSearchParams();

  const resolver = yupResolver(
    Yup.object().shape({
      // username: YupValidators(t).mobile,
      // password: YupValidators(t).password
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
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    // const res = await signIn('credentials', {
    //   email: data.username,
    //   password: data.password,
    //   method: 'user-pass',
    //   redirect: false
    // })
    //
    // if (res && res.ok && res.error === null) {
    //   // Vars
    //   const redirectURL = searchParams.get('redirectTo') ?? '/'
    //
    //   router.replace(redirectURL)
    // } else {
    //   if (res?.error) {
    //     toast.error(t('toast.unauthorized'))
    //   }
    // }
  };

  return (
    <form
      noValidate
      method="post"
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5"
    >
      <Controller
        name="username"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Stack spacing={1.7}>
            <FormLabel required error={!!errors.username} disabled={isSubmitting}>
              {t('authLogin.username')}
            </FormLabel>
            <OutlinedInput
              {...field}
              fullWidth
              autoFocus
              disabled={isSubmitting}
              type="text"
              placeholder={t('authLogin.username_placeholder')}
              onChange={(e) => {
                field.onChange(e.target.value);
                // errorState !== null && setErrorState(null)
              }}
              inputProps={{
                maxLength: 11,
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
      <Controller
        name="password"
        control={control}
        rules={{ required: true }}
        render={({ field, fieldState: { error } }) => (
          <RHFPasswordField
            label={t('authLogin.password')}
            placeholder={t('authLogin.password_placeholder')}
            error={!!error?.message}
            helperText={error?.message}
            required
            {...field}
          />
        )}
      />
      <LoadingButton
        fullWidth
        variant="contained"
        size="large"
        type="submit"
        loading={isSubmitting}
      >
        {`${t('authLogin.login_to', {
          value: t('brandTitle'),
        })}`}
      </LoadingButton>
    </form>
  );
};

export default LoginWithUserPass;
