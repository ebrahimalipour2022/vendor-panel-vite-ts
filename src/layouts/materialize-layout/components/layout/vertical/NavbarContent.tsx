// Third-party Imports
import classnames from 'classnames';

// Type Imports
import Button, { type ButtonProps } from '@mui/material/Button';

import type { NotificationsType } from '@/layouts/materialize-layout/components/layout/shared/NotificationsDropdown';
import NotificationsDropdown from '@/layouts/materialize-layout/components/layout/shared/NotificationsDropdown';

// Component Imports
import ModeDropdown from '@/layouts/materialize-layout/components/layout/shared/ModeDropdown';

// Util Imports
import { verticalLayoutClasses } from '@/layouts/materialize-layout/@layouts/utils/layoutClasses';
import { useTranslation } from 'react-i18next';
import OpenDialogOnElementClick from '@/components/dialogs/OpenDialogOnElementClick';
import WalletBalance from '@/layouts/materialize-layout/components/layout/shared/WalletBalance';
import NewOrder from '@/components/dialogs/orders-dialogs/new-order';
import NavToggle from './NavToggle';

const notifications: NotificationsType[] = [
  {
    avatarImage: '/images/avatars/2.png',
    title: 'Congratulations Flora 🎉',
    subtitle: 'Won the monthly bestseller gold badge',
    time: '1h ago',
    read: false,
  },
  {
    title: 'Cecilia Becker',
    subtitle: 'Accepted your connection',
    time: '12h ago',
    read: false,
  },
  {
    avatarImage: '/images/avatars/3.png',
    title: 'Bernard Woods',
    subtitle: 'You have new message from Bernard Woods',
    time: 'May 18, 8:26 AM',
    read: true,
  },
  {
    avatarIcon: 'ri-bar-chart-line',
    avatarColor: 'info',
    title: 'Monthly report generated',
    subtitle: 'July month financial report is generated',
    time: 'Apr 24, 10:30 AM',
    read: true,
  },
  {
    avatarText: 'MG',
    avatarColor: 'success',
    title: 'Application has been approved 🚀',
    subtitle: 'Your Meta Gadgets project application has been approved.',
    time: 'Feb 17, 12:17 PM',
    read: true,
  },
  {
    avatarIcon: 'ri-mail-line',
    avatarColor: 'error',
    title: 'New message from Harry',
    subtitle: 'You have new message from Harry',
    time: 'Jan 6, 1:48 PM',
    read: true,
  },
];

const NavbarContent = () => {
  // hooks
  const { t } = useTranslation();

  // Vars
  const newOrderButtonProps: ButtonProps = {
    variant: 'contained',
    children: t('orders.newOrder'),
    startIcon: <i className={'ri-add-circle-line'} />,
  };

  return (
    <div
      className={classnames(
        verticalLayoutClasses.navbarContent,
        'flex items-center justify-between gap-4 is-full'
      )}
    >
      <div className="flex items-center ">
        <div className="hidden md:block">
          <WalletBalance />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <OpenDialogOnElementClick
          element={Button}
          elementProps={newOrderButtonProps}
          dialog={NewOrder}
        />
        {/*<LanguageDropdown />*/}
        {/*<ShortcutsDropdown shortcuts={shortcuts} />*/}
        {/*<UserDropdown />*/}
        <ModeDropdown />
        <NotificationsDropdown notifications={notifications} />
        <NavToggle />
      </div>
    </div>
  );
};

export default NavbarContent;
