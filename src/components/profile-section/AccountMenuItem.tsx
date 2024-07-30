import { useState } from 'react';

import useSWR from 'swr';
import Paper from '@mui/material/Paper';
import useMediaQuery from '@mui/material/useMediaQuery';
import type { Theme } from '@mui/material/styles';

import classnames from 'classnames';

// import { MenuItem as VMenuItem } from '@menu/vertical-menu';
// import urls from '@configs/axios/urls';
// import { umAPI } from '@configs/axios/api';
import { useTranslation } from 'react-i18next';
import ProfileMenuItems from '@/components/profile-section/sub-components/MenuItems';
import MobileAccountBrief from '@/components/profile-section/sub-components/MobileAccountBrief';
import { KeyIcon, UserEditIcon } from '@/assets/icons';
import CustomDialog from '@/components/dialogs/custom-dialog';
import MobileDialog from '@/components/dialogs/custom-dialog/MobileDialog/MobileDialog';
// import CustomAvatar from '@/components/mui/Avatar';
import { umAPI } from '@/utils/axios/api';
import urls from '@/utils/axios/urls';
import SvgColor from '@/components/svg-color';
import { useSettingsContext } from '@/components/settings';
import { navVerticalConfig } from '@/components/nav-section/config';
import CustomAvatar from '@/components/mui/Avatar';
import List from '@mui/material/List';
import NavItem from '@/components/nav-section/vertical/nav-item';
import Popover from '@mui/material/Popover';
import { Fade, Popper } from '@mui/material';

type ModalType = 'avatar' | 'password' | null;

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
  // OR
  // <Iconify icon="fluent:mail-24-filled" />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
);

const ICONS = {
  job: icon('ic_job'),
};

function AccountMenuItem() {
  const { t } = useTranslation();
  // fetch data
  const { data: userInfo, isLoading } = useSWR(urls.userInfo(), () => umAPI.userInfoAxios());
  // Hooks
  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const [modal, setModal] = useState<ModalType>(null);
  const settings = useSettingsContext();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);
  const onMouseEnter = () => {
    // if (!isSmallScreen) {
    // }
  };

  const onMouseLeave = () => {};

  const onToggleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => !prev);
  };

  const handleOpenFormModal = (event: any) => {};

  const handleCloseFormModal = () => {
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePopoverOpen = (event: any) => {
    if (!isSmallScreen) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handlePopoverClose = () => {
    if (!isSmallScreen) {
      setAnchorEl(null);
    }
  };

  const id = 'profile-button';
  return (
    <>
      <List disablePadding sx={{ px: 2 }}>
        <NavItem
          id={id}
          aria-owns={open ? 'mouse-over-popover' : undefined}
          aria-controls={open ? 'profile-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          aria-label="open profile"
          item={{
            title: t('profile.username'),
            path: '',
            icon: <CustomAvatar src="" alt={userInfo?.name} size={40} />,
          }}
          depth={1}
          active={false}
          // onMouseEnter={handlePopoverOpen}
          // onMouseLeave={handlePopoverClose}
          onClick={onToggleMenu}
          config={navVerticalConfig()}
        />
        {!isSmallScreen && (
          <Popper
            id={id}
            open={open}
            anchorEl={anchorEl}
            transition
            disablePortal={false}
            placement={'left-start'}
            sx={{ zIndex: 2000 }}
          >
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper className={classnames('shadow-lg', modal ? 'hidden' : '')}>
                  <ProfileMenuItems
                    userInfo={userInfo}
                    isLoading={isLoading}
                    setOpen={handleOpenFormModal}
                  />
                </Paper>
              </Fade>
            )}
          </Popper>
        )}
      </List>
      {/*<div*/}
      {/*  ref={anchorRef}*/}
      {/*  id="profile-button"*/}
      {/*  aria-controls={open ? 'profile-menu' : undefined}*/}
      {/*  aria-expanded={open ? 'true' : undefined}*/}
      {/*  aria-haspopup="true"*/}
      {/*  onMouseEnter={onMouseEnter}*/}
      {/*  onMouseLeave={onMouseLeave}*/}
      {/*  onClick={onToggleMenu}*/}
      {/*  // icon={<CustomAvatar src="" alt={userInfo?.name} size={40} />}*/}
      {/*  // suffix={<i className="ri-arrow-left-s-line text-xl" />}*/}
      {/*>*/}
      {/*</div>*/}
      {/*{settings.themeLayout === 'vertical' && (*/}
      {/*  <NavAccountBrief userInfo={userInfo} isLoading={isLoading} />*/}
      {/*)}*/}

      {/* Must be outside VMenuItem because closeable outside VMenuItem */}
      {isSmallScreen && (
        <MobileDialog open={open} setOpen={handleClose} puller>
          <ProfileMenuItems
            userInfo={userInfo}
            isLoading={isLoading}
            element={MobileAccountBrief}
            setOpen={handleOpenFormModal}
          />
        </MobileDialog>
      )}
      {/* change password modal */}
      <CustomDialog
        title={t('changePassword.title')}
        open={modal === 'password'}
        setOpen={handleCloseFormModal}
        icon={<KeyIcon />}
      >
        <>ChangePasswordForm</>
        {/* <ChangePasswordForm handleClose={handleCloseFormModal} /> */}
      </CustomDialog>
      {/* change avatar modal */}
      <CustomDialog
        title={t('profile.avatar.title')}
        open={modal === 'avatar'}
        setOpen={handleCloseFormModal}
        icon={<UserEditIcon />}
      >
        <>ChangeAvatarForm</>
        {/* <ChangeAvatarForm */}
        {/*  handleClose={handleCloseFormModal} */}
        {/*  initialAvatar="/images/avatars/3.png" */}
        {/* /> */}
      </CustomDialog>
    </>
  );
}

export default AccountMenuItem;
