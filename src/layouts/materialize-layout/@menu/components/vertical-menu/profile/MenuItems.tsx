import type { ComponentType } from 'react';

import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import { ArrowLeftIcon, ExitIcon, KeyIcon, UserEditIcon } from '@/assets/icons';
import { useTranslation } from 'react-i18next';
import { useAuthContext } from '@/auth/hooks';

const ProfileMenuItems = ({
  userInfo,
  isLoading,
  element: Element,
  setOpen,
}: {
  userInfo: any;
  isLoading: boolean;
  setOpen: (value: 'avatar' | 'password' | null) => void;
  element?: ComponentType<any>;
}) => {
  const { t } = useTranslation();
  const { signOut } = useAuthContext();
  const handleUserLogout = async () => {
    await signOut();
  };

  return (
    <>
      <div className="p-2">
        <MenuList className={'py-0'}>
          {/*user info*/}
          <div className={'rounded-[0.5rem] bg-[var(--mui-palette-action-disabledBackground)]'}>
            {Element && (
              <MenuItem
                disabled
                // divider
                tabIndex={-1}
                className="gap-2 pli-5 plb-4"
                // onClick={e => handleDropdownClose(e, '')}
              >
                <Element userInfo={userInfo} isLoading={isLoading} />
              </MenuItem>
            )}
            <MenuItem disabled tabIndex={-1} className="gap-2 pli-5 plb-4 ">
              <div className="flex items-center justify-between w-full relative">
                <Typography variant="body2" color="text.primary">
                  {t('profile.username')}
                </Typography>
                <Typography variant="body2" className="font-bold" color="text.primary">
                  {userInfo?.name || '-----'}
                </Typography>
                <div className="absolute -bottom-[1rem] border-b w-full" />
              </div>
            </MenuItem>
            <MenuItem disabled tabIndex={-1} className="gap-2 pli-5 plb-4 ">
              <div className="flex items-center justify-between w-full relative">
                <Typography variant="body2" color="text.primary">
                  {t('profile.phone')}
                </Typography>
                <Typography variant="body2" className="font-bold" color="text.primary">
                  {userInfo?.mobile || '-----'}
                </Typography>
                <div className="absolute -bottom-[1rem] border-b w-full" />
              </div>
            </MenuItem>
            <MenuItem disabled tabIndex={-1} className="gap-2 pli-5 plb-4 ">
              <div className="flex items-center justify-between w-full">
                <Typography variant="body2" color="text.primary">
                  {t('profile.nationalCode')}
                </Typography>
                <Typography variant="body2" className="font-bold" color="text.primary">
                  {userInfo?.nationalCode || '-----'}
                </Typography>
              </div>
            </MenuItem>
          </div>
          {/*actions*/}
          <MenuItem divider className="gap-2 pli-4 plb-4" onClick={() => setOpen('avatar')}>
            <div className="w-6 h-6">
              <UserEditIcon />
            </div>
            <Typography className={'font-bold text-[0.875rem]'} color="text.primary">
              {t('profile.changeImage')}
            </Typography>
            <div className="w-6 h-6 mr-auto">
              <ArrowLeftIcon />
            </div>
          </MenuItem>
          <MenuItem divider className="gap-3 pli-4 plb-4" onClick={() => setOpen('password')}>
            <div className="w-6 h-6">
              <KeyIcon />
            </div>
            <Typography className={'font-bold text-[0.875rem]'} color="text.primary">
              {t('profile.changePassword')}
            </Typography>
            <div className="w-6 h-6 mr-auto">
              <ArrowLeftIcon />
            </div>
          </MenuItem>
          <MenuItem className="gap-3 pli-4 plb-4" onClick={handleUserLogout}>
            <div className="w-6 h-6">
              <ExitIcon />
            </div>
            <Typography className={'font-bold text-[0.875rem]'} color="error.main">
              {t('profile.logout')}
            </Typography>
            <div className="w-6 h-6 mr-auto" />
          </MenuItem>
        </MenuList>
      </div>
    </>
  );
};

export default ProfileMenuItems;
