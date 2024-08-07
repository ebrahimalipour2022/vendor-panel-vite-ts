import type { MouseEvent, ReactNode } from 'react';
// React Imports
import { useRef, useState } from 'react';

// MUI Imports
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import useMediaQuery from '@mui/material/useMediaQuery';
import Button from '@mui/material/Button';
import type { Theme } from '@mui/material/styles';

// Third Party Components
import classnames from 'classnames';
import PerfectScrollbar from 'react-perfect-scrollbar';

// Type Imports
import styled from '@emotion/styled';

import type { ThemeColor } from '@/layouts/materialize-layout/@core/types';
import type { CustomAvatarProps } from '@/layouts/materialize-layout/@core/components/mui/Avatar';
// Component Imports
import CustomAvatar from '@/layouts/materialize-layout/@core/components/mui/Avatar';

// Config Imports
import themeConfig from '@/layouts/materialize-layout/configs/themeConfig';

// Hook Imports
import { useSettings } from '@/layouts/materialize-layout/@core/hooks/useSettings';

// Util Imports
import NotificationIcon from '@/layouts/materialize-layout/@core/svg/Notification';
import { getInitials } from '@/layouts/materialize-layout//utils/getInitials';

export type NotificationsType = {
  title: string;
  subtitle: string;
  time: string;
  read: boolean;
} & (
  | {
      avatarImage?: string;
      avatarIcon?: never;
      avatarText?: never;
      avatarColor?: never;
      avatarSkin?: never;
    }
  | {
      avatarIcon?: string;
      avatarColor?: ThemeColor;
      avatarSkin?: CustomAvatarProps['skin'];
      avatarImage?: never;
      avatarText?: never;
    }
  | {
      avatarText?: string;
      avatarColor?: ThemeColor;
      avatarSkin?: CustomAvatarProps['skin'];
      avatarImage?: never;
      avatarIcon?: never;
    }
);

const ScrollWrapper = ({ children, hidden }: { children: ReactNode; hidden: boolean }) => {
  if (hidden) {
    return <div className="overflow-x-hidden max-bs-[420px]">{children}</div>;
  } else {
    return (
      <PerfectScrollbar
        className="max-bs-[420px]"
        options={{ wheelPropagation: false, suppressScrollX: true }}
      >
        {children}
      </PerfectScrollbar>
    );
  }
};

const getAvatar = (
  params: Pick<
    NotificationsType,
    'avatarImage' | 'avatarIcon' | 'title' | 'avatarText' | 'avatarColor' | 'avatarSkin'
  >
) => {
  const { avatarImage, avatarIcon, avatarText, title, avatarColor, avatarSkin } = params;

  if (avatarImage) {
    return <Avatar src={avatarImage} />;
  } else if (avatarIcon) {
    return (
      <CustomAvatar color={avatarColor} skin={avatarSkin || 'light-static'}>
        <i className={avatarIcon} />
      </CustomAvatar>
    );
  } else {
    return (
      <CustomAvatar color={avatarColor} skin={avatarSkin || 'light-static'}>
        {avatarText || getInitials(title)}
      </CustomAvatar>
    );
  }
};

const StyledBadge = styled('div')(({ theme }) => ({
  position: 'absolute',
  borderRadius: '50%',
  left: -4,
  top: -4,
  backgroundColor: 'var(--mui-palette-error-main)',
  width: 16,
  minWidth: 16,
  height: 16,
  border: `2px solid var(--mui-palette-background-paper)`,
  padding: 8,
  fontSize: '0.6rem',
  zIndex: 2,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& .notif_count': {
    marginTop: 3,
    fontWeight: '450',
    color: 'var(--mui-palette-error-contrastText)',
  },
}));

const NotificationDropdown = ({ notifications }: { notifications: NotificationsType[] }) => {
  // States
  const [open, setOpen] = useState(false);
  const [notificationsState, setNotificationsState] = useState(notifications);

  // Vars
  const notificationCount = notificationsState.filter((notification) => !notification.read).length;
  const readAll = notificationsState.every((notification) => notification.read);

  // Refs
  const anchorRef = useRef<HTMLButtonElement>(null);

  // Hooks
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));
  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const { settings } = useSettings();

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  // Read notification when notification is clicked
  const handleReadNotification = (
    event: MouseEvent<HTMLElement>,
    value: boolean,
    index: number
  ) => {
    event.stopPropagation();
    const newNotifications = [...notificationsState];

    newNotifications[index].read = value;
    setNotificationsState(newNotifications);
  };

  // Remove notification when close icon is clicked
  const handleRemoveNotification = (event: MouseEvent<HTMLElement>, index: number) => {
    event.stopPropagation();
    const newNotifications = [...notificationsState];

    newNotifications.splice(index, 1);
    setNotificationsState(newNotifications);
  };

  // Read or unread all notifications when read all icon is clicked
  const readAllNotifications = () => {
    const newNotifications = [...notificationsState];

    newNotifications.forEach((notification) => {
      notification.read = !readAll;
    });
    setNotificationsState(newNotifications);
  };

  const getNotificationCount = (count: number) => {
    if (count > 99) return `99+`;

    return count;
  };

  return (
    <>
      <div className={'relative'}>
        <StyledBadge>
          <span className={'notif_count'}>{getNotificationCount(notificationCount)}</span>
        </StyledBadge>
        <IconButton ref={anchorRef} onClick={handleToggle} color={'secondary'}>
          <NotificationIcon />
        </IconButton>
      </div>
      <Popper
        open={open}
        transition
        disablePortal
        placement="bottom-end"
        anchorEl={anchorRef.current}
        {...(isSmallScreen
          ? {
              className: 'is-full !mbs-4 z-[1]',
              modifiers: [
                {
                  name: 'preventOverflow',
                  options: {
                    padding: themeConfig.layoutPadding,
                  },
                },
              ],
            }
          : { className: 'is-96 !mbs-4 z-[1]' })}
      >
        {({ TransitionProps, placement }) => (
          <Fade
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom-end' ? 'right top' : 'left top' }}
          >
            <Paper className={settings.skin === 'bordered' ? 'border shadow-none' : 'shadow-lg'}>
              <ClickAwayListener onClickAway={handleClose}>
                <div>
                  <div className="flex items-center justify-between plb-3 pli-4 is-full gap-2">
                    <Typography variant="h6" className="flex-auto">
                      Notifications
                    </Typography>
                    {notificationCount > 0 && (
                      <Chip
                        variant="tonal"
                        size="small"
                        color="primary"
                        label={`${notificationCount} New`}
                      />
                    )}
                    <Tooltip
                      title={readAll ? 'Mark all as unread' : 'Mark all as read'}
                      placement={placement === 'bottom-end' ? 'left' : 'right'}
                      slotProps={{
                        popper: {
                          sx: {
                            '& .MuiTooltip-tooltip': {
                              transformOrigin:
                                placement === 'bottom-end'
                                  ? 'right center !important'
                                  : 'right center !important',
                            },
                          },
                        },
                      }}
                    >
                      {notificationsState.length > 0 ? (
                        <IconButton
                          size="small"
                          onClick={() => readAllNotifications()}
                          className="text-textPrimary"
                        >
                          <i
                            className={classnames(
                              readAll ? 'ri-mail-line' : 'ri-mail-open-line',
                              'text-xl'
                            )}
                          />
                        </IconButton>
                      ) : (
                        <></>
                      )}
                    </Tooltip>
                  </div>
                  <Divider />
                  <ScrollWrapper hidden={hidden}>
                    {notificationsState.map((notification, index) => {
                      const {
                        title,
                        subtitle,
                        time,
                        read,
                        avatarImage,
                        avatarIcon,
                        avatarText,
                        avatarColor,
                        avatarSkin,
                      } = notification;

                      return (
                        <div
                          key={index}
                          className={classnames(
                            'flex plb-3 pli-4 gap-3 cursor-pointer hover:bg-actionHover group',
                            {
                              'border-be': index !== notificationsState.length - 1,
                            }
                          )}
                          onClick={(e) => handleReadNotification(e, true, index)}
                        >
                          {getAvatar({
                            avatarImage,
                            avatarIcon,
                            title,
                            avatarText,
                            avatarColor,
                            avatarSkin,
                          })}
                          <div className="flex flex-col flex-auto">
                            <Typography
                              variant="body2"
                              className="font-medium mbe-1"
                              color="text.primary"
                            >
                              {title}
                            </Typography>
                            <Typography variant="caption" className="mbe-2" color="text.secondary">
                              {subtitle}
                            </Typography>
                            <Typography variant="caption" color="text.disabled">
                              {time}
                            </Typography>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <Badge
                              variant="dot"
                              color={read ? 'secondary' : 'primary'}
                              onClick={(e) => handleReadNotification(e, !read, index)}
                              className={classnames('mbs-1 mie-1', {
                                'invisible group-hover:visible': read,
                              })}
                            />
                            <i
                              className="ri-close-line text-xl invisible group-hover:visible text-textSecondary"
                              onClick={(e) => handleRemoveNotification(e, index)}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </ScrollWrapper>
                  <Divider />
                  <div className="p-4">
                    <Button fullWidth variant="contained" size="small">
                      View All Notifications
                    </Button>
                  </div>
                </div>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  );
};

export default NotificationDropdown;
