// MUI Imports
import { useTheme } from '@mui/material/styles';

// Third-party Imports
import PerfectScrollbar from 'react-perfect-scrollbar';

// Type Imports
import type { VerticalMenuContextProps } from '@/layouts/materialize-layout/@menu/components/vertical-menu/Menu';

// Component Imports
import { Menu, MenuItem, SubMenu } from '@/layouts/materialize-layout/@menu/vertical-menu';

// import { GenerateVerticalMenu } from '@components/GenerateMenu'
// Hook Imports
import { useSettings } from '@/layouts/materialize-layout/@core/hooks/useSettings';
import useVerticalNav from '@/layouts/materialize-layout/@menu/hooks/useVerticalNav';

// Styled Component Imports
import StyledVerticalNavExpandIcon from '@/layouts/materialize-layout/@menu/styles/vertical/StyledVerticalNavExpandIcon';

// Style Imports
import menuItemStyles from '@/layouts/materialize-layout/@core/styles/vertical/menuItemStyles';
import menuSectionStyles from '@/layouts/materialize-layout/@core/styles/vertical/menuSectionStyles';
import WalletBalance from '@/layouts/materialize-layout/components/layout/shared/WalletBalance';
import AccountMenuItem from '@/layouts/materialize-layout/@menu/components/vertical-menu/AccountMenuItem';
import { ArrowForwardIosOutlined } from '@mui/icons-material';
import {
  OrdersIcon,
  ReportsIcon,
  TransactionIcon,
  SettingsIcon,
  OrderAddressIcon,
} from '@/assets/icons';

// Menu Data Imports
// import menuData from '@/data/navigation/verticalMenuData'

type RenderExpandIconProps = {
  open?: boolean;
  transitionDuration?: VerticalMenuContextProps['transitionDuration'];
};

type Props = {
  scrollMenu: (container: any, isPerfectScrollbar: boolean) => void;
};

const RenderExpandIcon = ({ open, transitionDuration }: RenderExpandIconProps) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <ArrowForwardIosOutlined className={'w-4 h-4'} />
  </StyledVerticalNavExpandIcon>
);

const VerticalMenu = ({ scrollMenu }: Props) => {
  // Hooks
  const theme = useTheme();
  const verticalNavOptions = useVerticalNav();
  const { settings } = useSettings();
  const { isBreakpointReached } = useVerticalNav();

  // Vars
  const { transitionDuration } = verticalNavOptions;

  const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar;

  return (
    // eslint-disable-next-line lines-around-comment
    /* Custom scrollbar instead of browser scroll, remove if you want browser scroll only */
    <ScrollWrapper
      {...(isBreakpointReached
        ? {
            className: 'bs-full overflow-y-auto overflow-x-hidden',
            onScroll: (container) => scrollMenu(container, false),
          }
        : {
            options: { wheelPropagation: false, suppressScrollX: true },
            onScrollY: (container) => scrollMenu(container, true),
          })}
    >
      {/* Incase you also want to scroll NavHeader to scroll with Vertical Menu, remove NavHeader from above and paste it below this comment */}
      {/* Vertical Menu */}
      <Menu
        popoutMenuOffset={{ mainAxis: 17 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme, settings)}
        renderExpandIcon={({ open }) => (
          <RenderExpandIcon open={open} transitionDuration={transitionDuration} />
        )}
        renderExpandedMenuItemIcon={{ icon: <i className="ri-circle-fill" /> }}
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
      >
        <div className="border-b w-full  border-[--mui-palette-primary-light]" />
        <AccountMenuItem settings={settings} />
        <div className="border-b w-full  border-[--mui-palette-primary-light]" />
        <MenuItem href="/dashboard/orders" icon={<OrdersIcon />}>{`سفارش ها`}</MenuItem>
        <MenuItem href="/dashboard/reports" icon={<ReportsIcon />}>{`گزارش ها`}</MenuItem>
        <MenuItem
          href="/dashboard/transactions"
          icon={<TransactionIcon />}
        >{`موجودی و تراکنش ها`}</MenuItem>
        <SubMenu
          label="تنظیمات"
          icon={<SettingsIcon />}
          // suffix={<Chip label='3' size='small' color='error' />}
        >
          <MenuItem
            href="/dashboard/order-address"
            icon={<OrderAddressIcon />}
          >{`آدرس ها`}</MenuItem>
        </SubMenu>
        <div className="block md:hidden w-full border-b my-2 border-[--mui-palette-primary-light]" />
      </Menu>
      <div className={'mx-2 block md:hidden'}>
        <WalletBalance />
      </div>
    </ScrollWrapper>
  );
};

export default VerticalMenu;
