// MUI Imports
import LoadingButton from '@mui/lab/LoadingButton';

// Third-party Imports
import type { SubmitHandler } from 'react-hook-form';
import { Controller, useForm } from 'react-hook-form';

// Util Imports
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import RHFPasswordField from '@/components/hook-form/RHFPasswordInput';
import RHFOutlinedInput from '@/components/hook-form/RHFOutlinedInput';
import { YupValidators } from '@/utils/forms-validation';
import { useAuthContext } from '@/auth/hooks';

interface FormData {
  username: string;
  password: string;
}

const LoginWithUserPass = () => {
  // Hooks
  const { t } = useTranslation();
  const { login } = useAuthContext();

  const resolver = yupResolver(
    Yup.object().shape({
      username: YupValidators().mobile,
      password: YupValidators().password,
    })
  );

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormData>({
    resolver,
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (values: FormData) => {
    await login({ ...values, method: 'user-pass' });
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
        render={({ field, fieldState: { error } }) => (
          <RHFOutlinedInput
            label={t('authLogin.username')}
            placeholder={t('authLogin.username_placeholder')}
            error={!!error?.message}
            helperText={error?.message}
            required={true}
            inputProps={{
              maxLength: 20,
            }}
            {...field}
          />
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
