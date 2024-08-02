import { useEffect, useState } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import type { StateOption } from '@/types/select-field';
import EmptyState from '@/components/empty-state';
import AddressCard from '@/components/order-address/address-card';
import { NewAddressIcon } from '@/assets/icons';
import AddEditAddressDialog from '@/components/dialogs/order-address-dialogs/add-edit-address';
import { useLazyGetOrderAddressesQuery } from '@/redux/api/order-address/order-address';
import SearchField from './SearchField';
import CSelectField from './ReactSelectField';

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

  const getAddressList = async () => {
    // console.log('isLoading list', isLoading);
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

  const renderAddresses = () => {
    if (addresses?.length) {
      return addresses.map((item, index) => <AddressCard key={item.id} address={item} />);
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
  };

  const handleNewAddress = (value: boolean) => {
    setAddEditAddressDialog(value);
  };

  return (
    <>
      <Stack gap={4}>
        <div className={'flex flex-row items-center justify-between'}>
          <div id={'page-title'} className={'hidden md:block'}>
            <Typography component={'h2'} variant={'body1'} fontWeight={'bold'}>
              آدرس های منتخب
            </Typography>
          </div>
          <div id={'page-actions'} className={'flex flex-row gap-2'}>
            <SearchField placeholder={'در لیست جستجو کنید...'} sx={{ width: 250 }} />
            <CSelectField
              value={selectedOption}
              allOption={'همه شعب'}
              placeholder={'انتخاب شعبه'}
              options={options}
              handleChange={handleChange}
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
      <AddEditAddressDialog open={addEditAddressDialog} setOpen={handleNewAddress} />
    </>
  );
};

// ثبت آدرس جدید
export default AddressesView;