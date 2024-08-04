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
import IRMapComponent from '@/components/IRMapComponent';
import { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';

type AddOrderProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  data?: IOrderAddress | null;
};

const AddEditAddressDialog = ({ open, setOpen, data }: AddOrderProps) => {
  const { t } = useTranslation();
  // const [center, setCenter] = useState({
  //   lat: 35.75753482568149,
  //   lng: 51.40995708465471,
  // });

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
    watch,
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
        latitude: 0,
        longitude: 0,
      },
      mobile: '',
    },
    resolver,
  });

  const watchLocation = watch('location');

  const setCenter = () => {};

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
      PaperProps={{
        sx: {
          maxHeight: '90vh',
          // minHeight: '90vh',
        },
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className={'w-full'}>
        <div className={'flex gap-4'}>
          <div className={'w-full md:max-w-[348px] relative pb-12 overflow-y-auto'}>
            <Grid container spacing={3}>
              <Grid item xs={12} className={'block md:hidden'}>
                <div className={'grow flex flex-col p-0 relative h-[200px] '}>
                  <IRMapComponent center={watchLocation} setCenter={setCenter} onlyView={true} />
                </div>
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="title"
                  control={control}
                  rules={{ required: true }}
                  render={({ field, fieldState: { error } }) => (
                    <RHFOutlinedInput
                      label={t('address.address_title')}
                      placeholder={t('address.address_placeholder')}
                      error={!!error?.message}
                      helperText={error?.message}
                      required={true}
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item container spacing={3} xs={12}>
                <Grid item xs={4}>
                  <Controller
                    name="plaque"
                    control={control}
                    rules={{ required: true }}
                    render={({ field, fieldState: { error } }) => (
                      <RHFOutlinedInput
                        label={t('address.plaque')}
                        placeholder={'-'}
                        error={!!error?.message}
                        helperText={error?.message}
                        required={true}
                        {...field}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Controller
                    name="floor"
                    control={control}
                    rules={{ required: true }}
                    render={({ field, fieldState: { error } }) => (
                      <RHFOutlinedInput
                        label={t('address.floor')}
                        placeholder={'-'}
                        error={!!error?.message}
                        helperText={error?.message}
                        required={true}
                        {...field}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Controller
                    name="unit"
                    control={control}
                    rules={{ required: true }}
                    render={({ field, fieldState: { error } }) => (
                      <RHFOutlinedInput
                        label={t('address.unit')}
                        placeholder={'-'}
                        error={!!error?.message}
                        helperText={error?.message}
                        required={true}
                        {...field}
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="fullName"
                  control={control}
                  rules={{ required: true }}
                  render={({ field, fieldState: { error } }) => (
                    <RHFOutlinedInput
                      label={t('address.fullName')}
                      placeholder={t('address.fullName_placeholder')}
                      error={!!error?.message}
                      helperText={error?.message}
                      required={true}
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="mobile"
                  control={control}
                  rules={{ required: true }}
                  render={({ field, fieldState: { error } }) => (
                    <RHFOutlinedInput
                      label={t('address.mobile')}
                      placeholder={t('address.mobile_placeholder')}
                      error={!!error?.message}
                      helperText={error?.message}
                      required={true}
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} />
            </Grid>
            <LoadingButton
              type={'submit'}
              variant={'contained'}
              fullWidth
              className={'absolute bottom-0'}
            >
              تایید و ثبت آدرس
            </LoadingButton>
          </div>
          <div
            className={
              'grow rounded-sm hidden md:flex flex-col p-0 relative overflow-y-auto h-[700px] bg-[var(--mui-palette-background-default)]'
            }
          >
            <IRMapComponent center={watchLocation} setCenter={setCenter} onlyView={false} />
          </div>
        </div>
      </form>
    </CustomDialog>
  );
};

export default AddEditAddressDialog;
