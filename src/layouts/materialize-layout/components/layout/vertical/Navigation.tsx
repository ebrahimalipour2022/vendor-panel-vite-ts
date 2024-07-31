// React Imports
import { useEffect, useRef } from 'react';

// MUI Imports
import { styled, useColorScheme, useTheme } from '@mui/material/styles';

// Type Imports
import type { Mode, SystemMode } from '@/layouts/materialize-layout/@core/types';

// Component Imports
import VerticalNav, {
  NavCollapseIcons,
  NavHeader,
} from '@/layouts/materialize-layout/@menu/vertical-menu';

// Hook Imports
import useVerticalNav from '@/layouts/materialize-layout/@menu/hooks/useVerticalNav';
import { useSettings } from '@/layouts/materialize-layout/@core/hooks/useSettings';

// Style Imports
import navigationCustomStyles from '@/layouts/materialize-layout/@core/styles/vertical/navigationCustomStyles';
import LogoZapBlue from '@/layouts/materialize-layout/@core/svg/LogoZapBlue';
import VerticalMenu from './VerticalMenu';

type Props = {
  mode: Mode;
  systemMode: SystemMode;
};

const StyledBoxForShadow = styled('div')(({ theme }) => ({
  top: 60,
  left: -8,
  zIndex: 2,
  opacity: 0,
  position: 'absolute',
  pointerEvents: 'none',
  width: 'calc(100% + 15px)',
  height: theme.mixins.toolbar.minHeight,
  transition: 'opacity .15s ease-in-out',
  background: `linear-gradient(var(--mui-palette-background-default) ${
    theme.direction === 'rtl' ? '95%' : '5%'
  }, rgb(var(--mui-palette-background-defaultChannel) / 0.85) 30%, rgb(var(--mui-palette-background-defaultChannel) / 0.5) 65%, rgb(var(--mui-palette-background-defaultChannel) / 0.3) 75%, transparent)`,
  '&.scrolled': {
    opacity: 1,
  },
}));

const MenuLockedSvg = (
  <div className={'rotate-180 w-6 h-6'}>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20" fill="none">
      <path
        d="M12.8541 10L9.60409 6.75004C9.45131 6.59726 9.37492 6.40282 9.37492 6.16671C9.37492 5.9306 9.45131 5.73615 9.60409 5.58337C9.75686 5.4306 9.95131 5.35421 10.1874 5.35421C10.4235 5.35421 10.618 5.4306 10.7708 5.58337L14.6041 9.41671C14.6874 9.50004 14.7464 9.59032 14.7812 9.68754C14.8159 9.78476 14.8333 9.88893 14.8333 10C14.8333 10.1112 14.8159 10.2153 14.7812 10.3125C14.7464 10.4098 14.6874 10.5 14.6041 10.5834L10.7708 14.4167C10.618 14.5695 10.4235 14.6459 10.1874 14.6459C9.95131 14.6459 9.75686 14.5695 9.60409 14.4167C9.45131 14.2639 9.37492 14.0695 9.37492 13.8334C9.37492 13.5973 9.45131 13.4028 9.60409 13.25L12.8541 10Z"
        fill="var(--mui-palette-primary-lightestOpacity)"
      />
      <path
        d="M6.04159 5C6.2777 5 6.47561 5.07986 6.63533 5.23958C6.79506 5.39931 6.87492 5.59722 6.87492 5.83333V14.1667C6.87492 14.4028 6.79506 14.6007 6.63533 14.7604C6.47561 14.9201 6.2777 15 6.04159 15C5.80547 15 5.60756 14.9201 5.44783 14.7604C5.28811 14.6007 5.20825 14.4028 5.20825 14.1667V5.83333C5.20825 5.59722 5.28811 5.39931 5.44783 5.23958C5.60756 5.07986 5.80547 5 6.04159 5Z"
        fill="var(--mui-palette-primary-lightestOpacity)"
      />
    </svg>
  </div>
);

const MenuUnLockedSvg = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20" fill="none">
    <path
      d="M12.8541 10L9.60409 6.75004C9.45131 6.59726 9.37492 6.40282 9.37492 6.16671C9.37492 5.9306 9.45131 5.73615 9.60409 5.58337C9.75686 5.4306 9.95131 5.35421 10.1874 5.35421C10.4235 5.35421 10.618 5.4306 10.7708 5.58337L14.6041 9.41671C14.6874 9.50004 14.7464 9.59032 14.7812 9.68754C14.8159 9.78476 14.8333 9.88893 14.8333 10C14.8333 10.1112 14.8159 10.2153 14.7812 10.3125C14.7464 10.4098 14.6874 10.5 14.6041 10.5834L10.7708 14.4167C10.618 14.5695 10.4235 14.6459 10.1874 14.6459C9.95131 14.6459 9.75686 14.5695 9.60409 14.4167C9.45131 14.2639 9.37492 14.0695 9.37492 13.8334C9.37492 13.5973 9.45131 13.4028 9.60409 13.25L12.8541 10Z"
      fill="var(--mui-palette-primary-lightestOpacity)"
    />
    <path
      d="M6.04159 5C6.2777 5 6.47561 5.07986 6.63533 5.23958C6.79506 5.39931 6.87492 5.59722 6.87492 5.83333V14.1667C6.87492 14.4028 6.79506 14.6007 6.63533 14.7604C6.47561 14.9201 6.2777 15 6.04159 15C5.80547 15 5.60756 14.9201 5.44783 14.7604C5.28811 14.6007 5.20825 14.4028 5.20825 14.1667V5.83333C5.20825 5.59722 5.28811 5.39931 5.44783 5.23958C5.60756 5.07986 5.80547 5 6.04159 5Z"
      fill="var(--mui-palette-primary-lightestOpacity)"
    />
  </svg>
);

const Navigation = (props: Props) => {
  // Props
  const { mode, systemMode } = props;

  // Hooks
  const verticalNavOptions = useVerticalNav();
  const { updateSettings, settings } = useSettings();
  const { mode: muiMode, systemMode: muiSystemMode } = useColorScheme();
  const theme = useTheme();

  // Refs
  const shadowRef = useRef(null);

  // Vars
  const { isCollapsed, isHovered, collapseVerticalNav, isBreakpointReached } = verticalNavOptions;
  const isServer = typeof window === 'undefined';
  const isSemiDark = settings.semiDark;
  let isDark;

  if (isServer) {
    isDark = mode === 'system' ? systemMode === 'dark' : mode === 'dark';
  } else {
    isDark = muiMode === 'system' ? muiSystemMode === 'dark' : muiMode === 'dark';
  }

  const scrollMenu = (container: any, isPerfectScrollbar: boolean) => {
    container = isBreakpointReached || !isPerfectScrollbar ? container.target : container;

    if (shadowRef && container.scrollTop > 0) {
      // @ts-ignore
      if (!shadowRef.current.classList.contains('scrolled')) {
        // @ts-ignore
        shadowRef.current.classList.add('scrolled');
      }
    } else {
      // @ts-ignore
      shadowRef.current.classList.remove('scrolled');
    }
  };

  useEffect(() => {
    if (settings.layout === 'collapsed') {
      collapseVerticalNav(true);
    } else {
      collapseVerticalNav(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.layout]);

  return (
    // eslint-disable-next-line lines-around-comment
    // Sidebar Vertical Menu
    <VerticalNav
      customStyles={navigationCustomStyles(verticalNavOptions, theme)}
      collapsedWidth={71}
      // backgroundColor='var(--mui-palette-background-default)'
      backgroundColor="var(--mui-palette-primary-main)"
      // eslint-disable-next-line lines-around-comment
      // The following condition adds the data-mui-color-scheme='dark' attribute to the VerticalNav component
      // when semiDark is enabled and the mode or systemMode is light
      {...(isSemiDark &&
        !isDark && {
          'data-mui-color-scheme': 'dark',
        })}
    >
      {/* Nav Header including Logo & nav toggle icons  */}
      <NavHeader>
        <NavCollapseIcons
          lockedIcon={MenuLockedSvg}
          unlockedIcon={MenuUnLockedSvg}
          closeIcon={<i className="ri-close-line text-xl" />}
          className="var(--mui-palette-secondary-contrastText)"
          onClick={() => updateSettings({ layout: isCollapsed ? 'vertical' : 'collapsed' })}
        />
        <div className={`${isCollapsed ? 'absolute bottom-4' : ''} w-[48px] h-[17px]`}>
          <LogoZapBlue />
        </div>
      </NavHeader>
      <StyledBoxForShadow ref={shadowRef} />
      <VerticalMenu scrollMenu={scrollMenu} />
    </VerticalNav>
  );
};

export default Navigation;
