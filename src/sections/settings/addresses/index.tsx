import { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { NewAddressIcon, RemoveIcon } from '@/assets/icons';
import {
  useDeleteOrderAddressesMutation,
  useLazyGetOrderAddressesQuery,
} from '@/store/api/order-address/order-address';
import { IOrderAddress } from '@/types';
import { useGetActiveStoreQuery, useGetAllActiveStoresQuery } from '@/store/api/vendor/vendor';
import AddressCard from '@/components/order-address/address-card';
import AddEditAddressDialog from '@/components/dialogs/order-address-dialogs/add-edit-address';
import EmptyState from '@/components/empty-state';
import ConfirmDialog from '@/components/dialogs/confirm-dialog';
import RHFReactSelectField from '@/components/hook-form-fields/RHFSelectField/ReactSelectField';
import LoadingScreen from '@/components/loading-screen/loading-screen';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import SearchField from './SearchField';

const AddressesView = () => {
  const { t } = useTranslation();
  const { data: activeStore, isLoading: isFetchingActiveStore } = useGetActiveStoreQuery();

  const [
    getList,
    { currentData: addresses, isLoading: isAddressLoading, isFetching: isAddressFetching },
  ] = useLazyGetOrderAddressesQuery();

  const { data: activeStores, isLoading: isActiveStoresLoading } = useGetAllActiveStoresQuery();
  const [deleteAddress, { isLoading: isDeleteLoading }] = useDeleteOrderAddressesMutation();
  const [selectedOption, setSelectedOption] = useState([]);

  const [addEditAddressDialog, setAddEditAddressDialog] = useState<{
    address: IOrderAddress | null;
    open: boolean;
  }>({ open: false, address: null });

  const [openRemoveDialog, setOpenRemoveDialog] = useState<{ id: number; open: boolean }>({
    id: 0,
    open: false,
  });

  const getAddressList = async (id: number) => {
    try {
      // let _queryValues = {
      //   ...queryValues,
      //   ToRegistrationCreateDate: queryValues?.ToRegistrationCreateDate
      //     ? jMoment(queryValues.ToRegistrationCreateDate).format('YYYYMMDDHHmmssSSS')
      //     : '',
      //   FromRegistrationCreateDate: queryValues?.FromRegistrationCreateDate
      //     ? jMoment(queryValues.FromRegistrationCreateDate).format('YYYYMMDDHHmmssSSS')
      //     : '',
      // };
      await getList({ id: id!, query: '' }).unwrap();
    } catch (e) {
      /* empty */
    }
  };

  useEffect(() => {
    if (activeStore?.storeId) {
      getAddressList(activeStore?.storeId);
    }
  }, [activeStore]);

  const handleBranchOption = (newOptions: any) => {
    setSelectedOption(newOptions);
  };

  const handleEdit = (address: IOrderAddress) => {
    setAddEditAddressDialog({ open: true, address });
  };

  const handleAddressDialog = (value: boolean) => {
    setAddEditAddressDialog({ open: value, address: null });
  };

  const onConfirmRemoveAddress = async () => {
    try {
      await deleteAddress({ id: openRemoveDialog.id }).unwrap();
      toast.success(t('toast.successSubmit'), { toastId: 'delete-address-success-toast' });
      setOpenRemoveDialog({ open: false, id: 0 });
    } catch (err) {
      console.log(err);
    }
  };

  const loadingList = isFetchingActiveStore || isAddressLoading || isAddressFetching;

  const renderAddresses = () => {
    if (loadingList) {
      return (
        <div className={'absolute inset-0'}>
          <LoadingScreen />
        </div>
      );
    } else {
      if (addresses?.length) {
        return addresses.map((item, index) => (
          <AddressCard
            key={`${item.id}-${index}`}
            address={item}
            handleEdit={handleEdit}
            handleRemove={({ id }) => setOpenRemoveDialog({ open: true, id })}
          />
        ));
      } else {
        return (
          <EmptyState
            title={t('address.noAddressTitle')}
            subTitle={t('address.noAddressSubTitle')}
          />
        );
      }
    }
  };

  return (
    <>
      <Stack gap={4}>
        <div className={'flex flex-row items-center justify-between flex-wrap gap-2'}>
          <div id={'page-title'} className={'hidden md:block'}>
            <Typography component={'h2'} variant={'body1'} fontWeight={'bold'}>
              {t('address.pageTitle')}
            </Typography>
          </div>
          <div id={'page-actions'} className={'flex flex-row align-center flex-wrap gap-2'}>
            <SearchField placeholder={t('common.searchInList')} sx={{ maxWidth: 250 }} />
            <RHFReactSelectField
              value={selectedOption}
              allOptionText={t('address.allBranches')}
              placeholder={t('address.selectBranch')}
              handleChange={handleBranchOption}
              name={'branches-field'}
              isMulti={true}
              options={activeStores || []}
              isLoading={isActiveStoresLoading}
              isDisable={isActiveStoresLoading}
            />
            <Button
              variant={'outlined'}
              startIcon={<NewAddressIcon width={'20px'} height={'20px'} />}
              onClick={() => handleAddressDialog(true)}
              className={
                'fixed z-10 right-7 bottom-7 md:right-[initial] md:bottom-[initial] md:relative md:inline-flex'
              }
            >
              {t('address.registerNewAddress')}
            </Button>
          </div>
        </div>
        {renderAddresses()}
      </Stack>
      {addEditAddressDialog.open && (
        <AddEditAddressDialog
          open={true}
          setOpen={handleAddressDialog}
          data={addEditAddressDialog.address}
          storeId={activeStore?.storeId!}
        />
      )}
      {openRemoveDialog.open && (
        <ConfirmDialog
          open={true}
          title={t('address.removeAddressTitle')}
          subTitle={t('address.removeAddressSubTitle')}
          confirmBtnProps={{
            children: t('address.removeAddress'),
            startIcon: <RemoveIcon color={'var(--mui-palette-error-contrastText)'} />,
            loading: isDeleteLoading,
            variant: 'contained',
            color: 'error',
            fullWidth: true,
            className: 'min-w-[calc(100%_-_80px)]',
          }}
          cancelBtnProps={{
            children: t('common.cancel'),
            variant: 'outlined',
            color: 'primary',
            className: 'w-full',
          }}
          onConfirm={onConfirmRemoveAddress}
          onCancel={() => setOpenRemoveDialog({ open: false, id: 0 })}
          setOpen={(open) => setOpenRemoveDialog({ open, id: 0 })}
        />
      )}
    </>
  );
};

export default AddressesView;
