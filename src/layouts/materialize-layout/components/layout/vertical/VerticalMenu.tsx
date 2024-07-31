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
    <i className="ri-arrow-right-s-line" />
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
        <MenuItem href="/orders" icon={<i className="ri-home-smile-line" />}>{`سفارش ها`}</MenuItem>
        <MenuItem
          href="/reports"
          icon={<i className="ri-home-smile-line" />}
        >{`گزارش ها`}</MenuItem>
        <MenuItem
          href="/transactions"
          icon={<i className="ri-home-smile-line" />}
        >{`موجودی و تراکنش ها`}</MenuItem>
        <SubMenu
          label="تنظیمات"
          icon={<i className="ri-home-smile-line" />}
          // suffix={<Chip label='3' size='small' color='error' />}
        >
          <MenuItem href="/addresses">{`آدرس ها`}</MenuItem>
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
