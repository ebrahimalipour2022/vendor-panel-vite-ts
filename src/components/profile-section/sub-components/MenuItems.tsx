import type { ComponentType } from 'react';

import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

// import { signOut } from 'next-auth/react'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeftIcon, ExitIcon, KeyIcon, UserEditIcon } from '@/assets/icons';

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
  const { t } = useTranslation('profile');
  const navigate = useNavigate();

  const handleUserLogout = async () => {
    try {
      // Sign out from the app
      // await signOut({ redirect: false })

      // Redirect to login page
      navigate('/login');
    } catch (error) {
      console.error(error);

      // Show above error in a toast like following
      // toastService.error((err as Error).message)
    }
  };

  return (
    <div className="p-2">
      <MenuList className="py-0">
        {/* user info */}
        <div className="rounded-[0.5rem] bg-[var(--mui-palette-action-disabledBackground)]">
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
                {t('username')}
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
                {t('phone')}
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
                {t('nationalCode')}
              </Typography>
              <Typography variant="body2" className="font-bold" color="text.primary">
                {userInfo?.nationalCode || '-----'}
              </Typography>
            </div>
          </MenuItem>
        </div>
        {/* actions */}
        <MenuItem divider className="gap-2 pli-4 plb-4" onClick={() => setOpen('avatar')}>
          <div className="w-6 h-6">
            <UserEditIcon />
          </div>
          <Typography className="font-bold text-[0.875rem]" color="text.primary">
            {t('changeImage')}
          </Typography>
          <div className="w-6 h-6 mr-auto">
            <ArrowLeftIcon />
          </div>
        </MenuItem>
        <MenuItem divider className="gap-3 pli-4 plb-4" onClick={() => setOpen('password')}>
          <div className="w-6 h-6">
            <KeyIcon />
          </div>
          <Typography className="font-bold text-[0.875rem]" color="text.primary">
            {t('changePassword')}
          </Typography>
          <div className="w-6 h-6 mr-auto">
            <ArrowLeftIcon />
          </div>
        </MenuItem>
        <MenuItem className="gap-3 pli-4 plb-4 hover:bg-red-200" onClick={handleUserLogout}>
          <div className="w-6 h-6">
            <ExitIcon />
          </div>
          <Typography className="font-bold text-[0.875rem]" color="error.main">
            {t('logout')}
          </Typography>
          <div className="w-6 h-6 mr-auto" />
        </MenuItem>
      </MenuList>
    </div>
  );
};

export default ProfileMenuItems;
