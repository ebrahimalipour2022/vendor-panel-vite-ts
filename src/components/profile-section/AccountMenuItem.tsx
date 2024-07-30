import { useRef, useState } from 'react';

import useSWR from 'swr';
import Paper from '@mui/material/Paper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
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
import NavAccountBrief from '@/components/profile-section/sub-components/NavAccountBrief';
// import CustomAvatar from '@/components/mui/Avatar';
import { umAPI } from '@/utils/axios/api';
import urls from '@/utils/axios/urls';
import SvgColor from '@/components/svg-color';
import { useSettingsContext } from '@/components/settings';

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
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const [modal, setModal] = useState<ModalType>(null);
  const settings = useSettingsContext();
  const handleClose = () => {
    setOpen(false);
  };

  const onMouseEnter = () => {
    if (!isSmallScreen) {
      setOpen((prevOpen) => !prevOpen);
    }
  };

  const onMouseLeave = () => {
    if (!isSmallScreen) {
      setOpen((prevOpen) => !prevOpen);
    }
  };

  const onToggleMenu = () => {
    if (isSmallScreen) {
      setOpen((prevOpen) => !prevOpen);
    }
  };

  const handleOpenFormModal = (val: ModalType) => {
    setModal(val);
  };

  const handleCloseFormModal = () => {
    setModal(null);
  };

  return (
    <>
      <div
        ref={anchorRef}
        id="profile-button"
        aria-controls={open ? 'profile-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onToggleMenu}
        // icon={<CustomAvatar src="" alt={userInfo?.name} size={40} />}
        // suffix={<i className="ri-arrow-left-s-line text-xl" />}
      >
        {settings.themeLayout === 'vertical' && (
          <NavAccountBrief userInfo={userInfo} isLoading={isLoading} />
        )}
        {!isSmallScreen && (
          <Popper
            open={open}
            transition
            disablePortal={false}
            placement="left-start"
            anchorEl={anchorRef.current}
            className={`is-96 !mbs-4 z-[1] !mr-3 `}
          >
            {({ TransitionProps, placement }) => (
              <Fade
                {...TransitionProps}
                style={{ transformOrigin: placement === 'left-end' ? 'right left' : 'left right' }}
              >
                <Paper className={classnames('shadow-lg', modal ? 'hidden' : '')}>
                  <ClickAwayListener onClickAway={handleClose}>
                    <ProfileMenuItems
                      userInfo={userInfo}
                      isLoading={isLoading}
                      setOpen={handleOpenFormModal}
                    />
                  </ClickAwayListener>
                </Paper>
              </Fade>
            )}
          </Popper>
        )}
      </div>
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
