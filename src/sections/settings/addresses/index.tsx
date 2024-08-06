import { Fragment, useEffect, useState } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import type { StateOption } from '@/types/select-field';
import EmptyState from '@/components/empty-state';
import AddressCard from '@/components/order-address/address-card';
import { NewAddressIcon } from '@/assets/icons';
import AddEditAddressDialog from '@/components/dialogs/order-address-dialogs/add-edit-address';
import { useLazyGetOrderAddressesQuery } from '@/store/api/order-address/order-address';
import { IOrderAddress } from '@/types';
import SearchField from './SearchField';
import RHFReactSelectField from '../../../components/hook-form-fields/RHFSelectField/ReactSelectField';
import LoadingScreen from '../../../components/loading-screen/loading-screen';

const options: StateOption[] = [
  { value: 'option1', label: 'تهرانپارس شرقی' },
  { value: 'option2', label: 'تهرانپارس غربی' },
  { value: 'option3', label: 'پاسداران' },
];

const defaultOptions: StateOption[] = [
  { value: 'option1', label: 'تهرانپارس شرقی' },
  { value: 'option3', label: 'پاسداران' },
];

const AddressesView = () => {
  const id = '100'; // store id
  const [getList, { currentData: addresses, isLoading, isFetching }] =
    useLazyGetOrderAddressesQuery();
  const [selectedOption, setSelectedOption] = useState(defaultOptions);
  const [addEditAddressDialog, setAddEditAddressDialog] = useState(false);
  const [address, setAddress] = useState<IOrderAddress>();
  const getAddressList = async () => {
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
      await getList({ id, query: '' }).unwrap();
    } catch (e) {
      /* empty */
    }
  };

  useEffect(() => {
    if (id) {
      getAddressList();
    }
  }, [id]);

  const handleChange = (newOptions: any) => {
    setSelectedOption(newOptions);
  };

  const handleRemove = ({ id }: { id: string }) => {};
  const handleEdit = (address: IOrderAddress) => {
    setAddress(address);
    setAddEditAddressDialog(true);
  };

  const renderAddresses = () => {
    if (isLoading || isFetching) {
      return (
        <div className={'absolute inset-0'}>
          <LoadingScreen />
        </div>
      );
    } else {
      if (addresses?.length) {
        return addresses.map((item, index) => (
          <AddressCard
            key={item.id}
            address={item}
            handleEdit={handleEdit}
            handleRemove={handleRemove}
          />
        ));
      } else {
        return (
          <EmptyState
            title={'آدرسی در این لیست نیست'}
            subTitle={
              'هیچ آدرسی در این صفحه ثبت نشده، با زدن دکمه زیر، آدرس جدید به لیست آدرس‌های منتخب اضافه کنید'
            }
          />
        );
      }
    }
  };

  const handleNewAddress = (value: boolean) => {
    setAddEditAddressDialog(value);
  };

  return (
    <>
      <Stack gap={4}>
        <div className={'flex flex-row items-center justify-between flex-wrap gap-2'}>
          <div id={'page-title'} className={'hidden md:block'}>
            <Typography component={'h2'} variant={'body1'} fontWeight={'bold'}>
              آدرس های منتخب
            </Typography>
          </div>
          <div id={'page-actions'} className={'flex flex-row align-center flex-wrap gap-2'}>
            <SearchField placeholder={'در لیست جستجو کنید...'} sx={{ maxWidth: 250 }} />
            <RHFReactSelectField
              value={selectedOption}
              allOptionText={'همه شعب'}
              placeholder={'انتخاب شعبه'}
              options={options}
              handleChange={handleChange}
              name={'branches-field'}
              isMulti={true}
            />
            <Button
              variant={'outlined'}
              startIcon={<NewAddressIcon width={'20px'} height={'20px'} />}
              onClick={() => handleNewAddress(true)}
              className={
                'fixed z-10 right-7 bottom-7 md:right-[initial] md:bottom-[initial] md:relative md:inline-flex'
              }
            >
              ثبت آدرس جدید
            </Button>
          </div>
        </div>

        {renderAddresses()}
      </Stack>
      <Fragment key={`${addEditAddressDialog}-addEditAddressDialog`}>
        <AddEditAddressDialog
          open={addEditAddressDialog}
          setOpen={handleNewAddress}
          data={address}
        />
      </Fragment>
    </>
  );
};

// ثبت آدرس جدید
export default AddressesView;
