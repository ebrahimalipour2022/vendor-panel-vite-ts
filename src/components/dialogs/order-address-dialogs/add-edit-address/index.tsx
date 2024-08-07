import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { YupValidators } from '@/utils/forms-validation';
import CustomDialog from '@/components/dialogs/custom-dialog';
import type { IOrderAddress } from '@/types/address';
import { isEmpty } from '@/utils/common';
import { useTranslation } from 'react-i18next';
import { EditIcon, LocationIcon } from '@/assets/icons';
import RHFOutlinedInput from '@/components/hook-form-fields/RHFOutlinedInput';
import LoadingButton from '@mui/lab/LoadingButton';
import RHFReactSelectField from '@/components/hook-form-fields/RHFSelectField/ReactSelectField';
import LeafletMapComponent from '@/components/LeafletMap';
import { i18n } from '@/locales/i18n';
import { useEffect } from 'react';
import { MapReverseAddressRes } from '@/types/address';
import {
  usePostOrderAddressesMutation,
  usePutOrderAddressesMutation,
} from '@/store/api/order-address/order-address';
import { useGetAllActiveStoresQuery } from '@/store/api/vendor/vendor';
import Divider from '@mui/material/Divider';
import { DEFAULT_POSITION } from '@/config-global';

type AddOrderProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  data?: IOrderAddress | null;
};
const resolver = yupResolver(
  Yup.object().shape({
    storeBranch: Yup.object()
      .shape({
        label: YupValidators().stringRequired,
        value: YupValidators().stringRequired,
      })
      .required(i18n.t('formCommonErrors.isRequired'))
      .nullable(i18n.t('formCommonErrors.isRequired')),
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
      .required(i18n.t('formCommonErrors.isRequired'))
      .nullable(i18n.t('formCommonErrors.isRequired')),
    mobile: YupValidators().mobile,
  })
);

const AddEditAddressDialog = ({ open, setOpen, data }: AddOrderProps) => {
  const { t } = useTranslation();
  const { data: activeStores, isLoading: isActiveStoresLoading } = useGetAllActiveStoresQuery();
  const [postAddress] = usePostOrderAddressesMutation();
  const [putAddress] = usePutOrderAddressesMutation();

  // Hooks
  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<IOrderAddress>({
    defaultValues: {
      storeBranch: {
        value: '',
        label: '',
      },
      title: '',
      fullName: '',
      clientAddress: '',
      plaque: '',
      unit: '',
      floor: '',
      location: {
        latitude: DEFAULT_POSITION.lat,
        longitude: DEFAULT_POSITION.lng,
      },
      mobile: '',
    },
    resolver,
  });

  const watchLocation = watch('location');

  useEffect(() => {
    if (data) {
      reset({ ...data });
    }
  }, [data]);

  const setAddress = (address: MapReverseAddressRes) => {
    if (address) {
      if ('formatted_address' in address && address?.formatted_address) {
        setValue('clientAddress', address.formatted_address);
      }
      if ('location' in address && address?.location) {
        setValue('location', address.location);
      }
    }
  };

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
      title={`${isEmpty(data?.id) ? t('common.add') : t('common.edit')} ${t('address.pageTitle')} ${
        isEmpty(data?.id) ? t('common.new') : ''
      }`}
      maxWidth={'lg'}
      fullWidth={true}
      icon={<LocationIcon />}
      PaperProps={{
        sx: {
          // maxHeight: '90vh',
          // minHeight: '90vh',
        },
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)} className={'w-full'}>
        <div className={'flex gap-4  h-[75vh]'}>
          <div className={'w-full md:max-w-[348px] relative pb-12 overflow-y-auto'}>
            <Grid container spacing={5}>
              <Grid item xs={12} className={'block md:hidden'}>
                <div className={'relative'}>
                  <Button
                    variant={'outlined'}
                    startIcon={
                      <EditIcon className={'[&>*]:fill-[var(--mui-palette-primary-main)]'} />
                    }
                    className={'absolute bottom-2 right-2 font-bold z-10'}
                  >
                    تغییر آدرس
                  </Button>
                  <div className={'grow flex flex-col p-0 relative h-[200px]'}>
                    {/*<IRMapComponent center={watchLocation} setCenter={setCenter} onlyView={true} />*/}
                  </div>
                </div>
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="storeBranch"
                  control={control}
                  rules={{ required: true }}
                  render={({ field, fieldState: { error } }) => {
                    return (
                      <RHFReactSelectField
                        label={t('address.store_title')}
                        placeholder={t('address.store_placeholder')}
                        value={field.value}
                        handleChange={field.onChange}
                        isMulti={false}
                        error={
                          // @ts-ignore
                          !!(error && 'value' in error && error?.value?.message) || !!error?.message
                        }
                        helperText={
                          // @ts-ignore
                          (error && 'value' in error && error?.value?.message) || error?.message
                        }
                        required={true}
                        options={activeStores || []}
                        isLoading={isActiveStoresLoading}
                        isDisable={isActiveStoresLoading}
                      />
                    );
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="clientAddress"
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
                      multiline={true}
                      maxRows={4}
                    />
                  )}
                />
              </Grid>
              <Grid item container spacing={5} xs={12}>
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
                <Divider />
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
              <Grid item xs={12}>
                <LoadingButton
                  type={'submit'}
                  variant={'contained'}
                  fullWidth
                  className={'md:absolute md:bottom-0'}
                >
                  تایید و ثبت آدرس
                </LoadingButton>
              </Grid>
            </Grid>
          </div>
          <div
            className={
              'grow rounded-sm hidden md:flex flex-col p-0 relative overflow-y-auto bg-[var(--mui-palette-background-default)]'
            }
          >
            <LeafletMapComponent
              position={watchLocation}
              setAddress={setAddress}
              onlyView={false}
            />
          </div>
        </div>
      </form>
    </CustomDialog>
  );
};

export default AddEditAddressDialog;
