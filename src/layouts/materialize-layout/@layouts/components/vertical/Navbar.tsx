// MUI Imports
import { useTheme } from '@mui/material/styles';
import useScrollTrigger from '@mui/material/useScrollTrigger';

// Third-party Imports
import classnames from 'classnames';
import type { CSSObject } from '@emotion/styled';

// Type Imports
import type { ChildrenType } from '@/layouts/materialize-layout/@core/types';

// Config Imports
import themeConfig from '@/layouts/materialize-layout/configs/themeConfig';

// Hook Imports
import { useSettings } from '@/layouts/materialize-layout/@core/hooks/useSettings';

// Util Imports
import { verticalLayoutClasses } from '@/layouts/materialize-layout/@layouts/utils/layoutClasses';

// Styled Component Imports
import StyledHeader from '@/layouts/materialize-layout/@layouts/styles/vertical/StyledHeader';

type Props = ChildrenType & {
  overrideStyles?: CSSObject;
};

const Navbar = (props: Props) => {
  // Props
  const { children, overrideStyles } = props;

  // Hooks
  const { settings } = useSettings();
  const theme = useTheme();

  const trigger = useScrollTrigger({
    threshold: 0,
    disableHysteresis: true,
  });

  // Vars
  const { navbarContentWidth } = settings;

  const headerFixed = themeConfig.navbar.type === 'fixed';
  const headerStatic = themeConfig.navbar.type === 'static';
  const headerFloating = themeConfig.navbar.floating === true;
  const headerDetached = themeConfig.navbar.detached === true;
  const headerAttached = themeConfig.navbar.detached === false;
  const headerBlur = themeConfig.navbar.blur === true;
  const headerContentCompact = navbarContentWidth === 'compact';
  const headerContentWide = navbarContentWidth === 'wide';

  return (
    <StyledHeader
      theme={theme}
      overrideStyles={overrideStyles}
      className={classnames(
        verticalLayoutClasses.header,
        'flex items-center justify-center is-full',
        {
          [verticalLayoutClasses.headerFixed]: headerFixed,
          [verticalLayoutClasses.headerStatic]: headerStatic,
          [verticalLayoutClasses.headerFloating]: headerFloating,
          [verticalLayoutClasses.headerDetached]: !headerFloating && headerDetached,
          [verticalLayoutClasses.headerAttached]: !headerFloating && headerAttached,
          [verticalLayoutClasses.headerBlur]: headerBlur,
          [verticalLayoutClasses.headerContentCompact]: headerContentCompact,
          [verticalLayoutClasses.headerContentWide]: headerContentWide,
          scrolled: trigger,
        }
      )}
    >
      <div className={classnames(verticalLayoutClasses.navbar, 'flex bs-full')}>{children}</div>
    </StyledHeader>
  );
};

export default Navbar;