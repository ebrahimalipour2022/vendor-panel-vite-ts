import Grid from '@mui/material/Grid';

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { Controller, useForm } from 'react-hook-form';

import { YupValidators } from '@/utils/forms-validation';

import CustomDialog from '@/components/dialogs/custom-dialog';
import type { IOrderAddress } from '@/types/address';
import { isEmpty } from '@/utils/common';
import { useTranslation } from 'react-i18next';
import { LocationIcon } from '@/assets/icons';
import RHFOutlinedInput from '@/components/hook-form/RHFOutlinedInput';

type AddOrderProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  data?: IOrderAddress | null;
};

const AddEditAddressDialog = ({ open, setOpen, data }: AddOrderProps) => {
  const { t } = useTranslation();

  const resolver = yupResolver(
    Yup.object().shape({
      storeId: YupValidators().stringRequired,
      title: YupValidators().stringRequired,
      fullName: YupValidators().stringRequired,
      clientAddress: YupValidators().stringRequired,
      plaque: YupValidators().stringRequired,
      unit: YupValidators().stringRequired,
      floor: YupValidators().stringRequired,
      location: Yup.object()
        .shape({
          latitude: YupValidators().stringRequired,
          longitude: YupValidators().stringRequired,
        })
        .required(t('formCommonErrors.isRequired'))
        .nullable(t('formCommonErrors.isRequired')),
      mobile: YupValidators().mobile,
    })
  );

  // Hooks
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<IOrderAddress>({
    defaultValues: {
      storeId: '',
      title: '',
      fullName: '',
      clientAddress: '',
      plaque: '',
      unit: '',
      floor: '',
      location: {
        latitude: '',
        longitude: '',
      },
      mobile: '',
    },
    resolver,
  });

  const onSubmit = async (values: IOrderAddress) => {
    // await authAPI
    //   .changePasswordApi(values)
    //   .then(res => {
    //     toast.success(t('toast.passwordChanged'), { toastId: 'change-pass-success-toast' })
    //   })
    //   .catch(err => {
    //     // toast.error(t('toast.passwordChangeError'), { toastId: 'change-pass-error-toast' })
    //   })
  };

  return (
    <CustomDialog
      open={open}
      setOpen={setOpen}
      title={`${isEmpty(data?.storeId) ? t('common.add') : t('common.edit')} ${t(
        'address.title'
      )} ${isEmpty(data?.storeId) && t('common.new')}`}
      maxWidth={'lg'}
      fullWidth={true}
      icon={<LocationIcon />}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item container md={4} xs={12}>
            <Grid item xs={12} />
            <Grid item xs={12}>
              <Controller
                name="title"
                control={control}
                rules={{ required: true }}
                render={({ field, fieldState: { error } }) => (
                  <RHFOutlinedInput
                    label={t('authLogin.password')}
                    placeholder={t('authLogin.password_placeholder')}
                    error={!!error?.message}
                    helperText={error?.message}
                    required={true}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={4} />
              <Grid item xs={4} />
              <Grid item xs={4} />
            </Grid>
            <Grid item xs={12} />
            <Grid item xs={12} />
            <Grid item xs={12} />
            <Grid item xs={12} />
          </Grid>
          <Grid item md={8} xs={12} />
        </Grid>
      </form>
    </CustomDialog>
  );
};

export default AddEditAddressDialog;
