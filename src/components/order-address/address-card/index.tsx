import type { MouseEvent, ReactNode } from 'react';
import { useState } from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import type { IOrderAddress } from '@/types/address';
import {
  PhoneIcon,
  PostalCodeIcon,
  ReceiverIcon,
  EditIcon,
  SubMenuThreeDotIcon,
  RemoveIcon,
} from '@/assets/icons';
import { useTranslation } from 'react-i18next';

const ICONS = {
  fullName: <ReceiverIcon />,
  phoneNumber: <PhoneIcon />,
  postalCode: <PostalCodeIcon />,
};

type Props = {
  address: IOrderAddress;
  handleRemove: ({ id }: { id: string }) => void;
  handleEdit: (address: IOrderAddress) => void;
};
const AddressCard = ({ address, handleEdit, handleRemove }: Props) => {
  const { t } = useTranslation();
  // States
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // Vars
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card className="relative bs-full" variant={'outlined'}>
      <CardHeader
        action={
          <>
            <IconButton
              aria-haspopup="true"
              onClick={handleClick}
              aria-expanded={open ? 'true' : undefined}
              aria-controls={open ? 'address-list' : undefined}
            >
              <SubMenuThreeDotIcon />
            </IconButton>
            <Menu open={open} anchorEl={anchorEl} onClose={handleClose} id="address-list">
              <MenuItem onClick={() => handleEdit(address)} divider>
                <div className={'w-6 h-6'}>
                  <EditIcon />
                </div>
                {t('common.edit')}
              </MenuItem>
              <MenuItem
                onClick={() => handleRemove({ id: address?.id! })}
                sx={{
                  color: 'var(--mui-palette-error-main)',
                }}
              >
                <div className={'w-6 h-6'}>
                  <RemoveIcon />
                </div>
                {t('common.remove')}
              </MenuItem>
            </Menu>
          </>
        }
        title={
          <div className={'flex flex-col sm:flex-row sm:justify-between sm:items-center'}>
            <div>
              <Typography variant={'body1'} fontWeight={'bold'}>
                {address?.clientAddress || '-----'}
              </Typography>
            </div>
            <div className={'ml-6'}>
              <Typography variant={'caption'}> {address?.title || '-----'}</Typography>
            </div>
          </div>
        }
        className={'bg-[var(--mui-palette-action-disabled)]'}
        // subheader='September 14, 2016'
        // titleTypographyProps={{
        //   fontSize: '14px'
        // }}
      />
      <CardContent className={'px-3 py-6'}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          <div className="w-full md:min-w-[100px] md:max-w-[200px] py-4 md:py-2 md:px-6 border-b md:border-b-0 md:border-l md:border-gray-300">
            <AddressItem
              icon={ICONS.fullName}
              label={'گیرنده'}
              value={address?.fullName || '-----'}
            />
          </div>
          <div className="w-full md:min-w-[100px] md:max-w-[200px] py-4 md:py-2 md:px-6">
            <AddressItem
              icon={ICONS.phoneNumber}
              label={'شماره تلفن'}
              value={address?.mobile || '-----'}
            />
          </div>
          {/*<div className="w-full md:min-w-[100px] md:max-w-[200px] py-4 md:py-2 md:px-6">*/}
          {/*  <AddressItem*/}
          {/*    icon={ICONS.postalCode}*/}
          {/*    label={'کد پستی'}*/}
          {/*    value={address?.postalCode || '-----'}*/}
          {/*  />*/}
          {/*</div>*/}
        </div>
      </CardContent>
    </Card>
  );
};

export default AddressCard;

const AddressItem = ({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: ReactNode;
}) => {
  return (
    <div className={'w-full flex flex-row items-center justify-start  gap-2'}>
      <div className={'w-5 h-5'}>{Icon}</div>
      <div className={'flex flex-col w-full'}>
        <Typography
          component={'p'}
          variant={'caption'}
          fontWeight={'bold'}
          color={'text.secondary'}
        >
          {label || '-----'}
        </Typography>
        <Typography
          component={'p'}
          variant={'body2'}
          fontWeight={'bold'}
          className={'w-[calc(100% - 1rem)] overflow-hidden whitespace-nowrap text-ellipsis'}
        >
          {value || '-----'}
        </Typography>
      </div>
    </div>
  );
};
