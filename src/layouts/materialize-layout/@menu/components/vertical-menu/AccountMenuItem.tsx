import { useRef, useState } from 'react';
import Paper from '@mui/material/Paper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import useMediaQuery from '@mui/material/useMediaQuery';
import type { Theme } from '@mui/material/styles';

import classnames from 'classnames';

import { MenuItem as VMenuItem } from '@/layouts/materialize-layout/@menu/vertical-menu';

import { useSettings } from '@/layouts/materialize-layout/@core/hooks/useSettings';
import type { Settings } from '@/layouts/materialize-layout/@core/contexts/settingsContext';
import CustomDialog from '@/components/dialogs/custom-dialog';
import ChangePasswordForm from '@/components/dialogs/profile/change-password';
import ChangeAvatarForm from '@/components/dialogs/profile/change-image';
import { useTranslation } from 'react-i18next';
import { KeyIcon, UserEditIcon } from '@/assets/icons';
import CustomAvatar from '@/layouts/materialize-layout/@core/components/mui/Avatar';
import NavAccountBrief from '@/layouts/materialize-layout/@menu/components/vertical-menu/profile/NavAccountBrief';
import ProfileMenuItems from '@/layouts/materialize-layout/@menu/components/vertical-menu/profile/MenuItems';
import MobileDialog from '@/components/dialogs/custom-dialog/MobileDialog/MobileDialog';
import MobileAccountBrief from '@/layouts/materialize-layout/@menu/components/vertical-menu/profile/MobileAccountBrief';

type ModalType = 'avatar' | 'password' | null;

function AccountMenuItem({ settings: Setting }: { settings: Settings }) {
  const userInfo = {
    name: 'name',
  };
  const isLoading = false;
  const { t } = useTranslation();
  // fetch data
  // const { data: userInfo, isLoading } = useSWR(urls.userInfo(), () => umAPI.userInfoAxios());
  // Hooks
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const { settings } = useSettings();
  const [modal, setModal] = useState<ModalType>(null);

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
      <VMenuItem
        ref={anchorRef}
        id="profile-button"
        aria-label="open profile"
        aria-controls={open ? 'profile-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onToggleMenu}
        icon={<CustomAvatar src={''} alt={userInfo?.name} size={40} />}
        suffix={<i className="ri-arrow-left-s-line text-xl" />}
      >
        {Setting.layout === 'vertical' && (
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
                <Paper
                  className={classnames(
                    settings.skin === 'bordered' ? 'border shadow-none' : 'shadow-lg',
                    modal ? 'hidden' : ''
                  )}
                >
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
      </VMenuItem>
      {/*Must be outside VMenuItem because closeable outside VMenuItem*/}
      {isSmallScreen && (
        <MobileDialog open={open} setOpen={handleClose} puller={true}>
          <ProfileMenuItems
            userInfo={userInfo}
            isLoading={isLoading}
            element={MobileAccountBrief}
            setOpen={handleOpenFormModal}
          />
        </MobileDialog>
      )}
      {/*change password modal*/}
      <CustomDialog
        title={t('changePassword.title')}
        open={modal === 'password'}
        setOpen={handleCloseFormModal}
        icon={<KeyIcon />}
      >
        <ChangePasswordForm handleClose={handleCloseFormModal} />
      </CustomDialog>
      {/*change avatar modal*/}
      <CustomDialog
        title={t('profile.avatar.title')}
        open={modal === 'avatar'}
        setOpen={handleCloseFormModal}
        icon={<UserEditIcon />}
      >
        <ChangeAvatarForm
          handleClose={handleCloseFormModal}
          initialAvatar={'/images/avatars/3.png'}
        />
      </CustomDialog>
    </>
  );
}

export default AccountMenuItem;
