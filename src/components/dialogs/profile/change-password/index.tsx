import { Controller, useForm } from 'react-hook-form';

import Grid from '@mui/material/Grid';

import Divider from '@mui/material/Divider';

import LoadingButton from '@mui/lab/LoadingButton';

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { toast } from 'react-toastify';

import { YupValidators } from '@/utils/forms-validation';
import { useTranslation } from 'react-i18next';
import { authAPI } from '@/utils/axios/api';
import RHFPasswordField from '@/components/hook-form/RHFPasswordInput';

type FormValues = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const ChangePasswordForm = ({ handleClose }: { handleClose: () => void }) => {
  const { t } = useTranslation();

  const resolver = yupResolver(
    Yup.object().shape({
      oldPassword: YupValidators().password,
      newPassword: YupValidators().password,
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), ''], t('formCommonErrors.noSamePassword'))
        .required(t('formCommonErrors.isRequired')),
    })
  );

  // Hooks
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    resolver,
  });

  const onSubmit = async (values: FormValues) => {
    await authAPI
      .changePasswordApi(values)
      .then(() => {
        toast.success(t('toast.passwordChanged'), { toastId: 'change-pass-success-toast' });
        // reset({})
        handleClose();
      })
      .catch(() => {
        // toast.error(t('toast.passwordChangeError'), { toastId: 'change-pass-error-toast' })
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={5}>
        <Grid item xs={12} className={'relative'}>
          <Controller
            name="oldPassword"
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState: { error } }) => (
              <RHFPasswordField
                label={t('changePassword.oldPassword')}
                placeholder={t('changePassword.oldPassword_placeholder')}
                error={!!error?.message}
                helperText={error?.message}
                required
                disabled={isSubmitting}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} className={'my-5'}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="newPassword"
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState: { error } }) => (
              <RHFPasswordField
                label={t('changePassword.newPassword')}
                placeholder={t('changePassword.newPassword_placeholder')}
                error={!!error?.message}
                helperText={error?.message}
                required
                disabled={isSubmitting}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="confirmPassword"
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState: { error } }) => (
              <RHFPasswordField
                label={t('changePassword.confirmPassword')}
                placeholder={t('changePassword.confirmPassword_placeholder')}
                error={!!error?.message}
                helperText={error?.message}
                required
                disabled={isSubmitting}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} className={'my-5'}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <LoadingButton
            loading={isSubmitting}
            type={'submit'}
            variant={'contained'}
            size={'large'}
            fullWidth
          >
            {`${t('common.confirmAndSubmit')} ${t('changePassword.newPassword')}`}
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default ChangePasswordForm;
