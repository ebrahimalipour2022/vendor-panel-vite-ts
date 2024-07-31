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
import { horizontalLayoutClasses } from '@/layouts/materialize-layout/@layouts/utils/layoutClasses';

// Styled Component Imports
import StyledHeader from '@/layouts/materialize-layout/@layouts/styles/horizontal/StyledHeader';

type Props = ChildrenType & {
  overrideStyles?: CSSObject;
};

const Header = (props: Props) => {
  // Props
  const { children, overrideStyles } = props;

  // Hooks
  const { settings } = useSettings();

  // Vars
  const { navbarContentWidth } = settings;

  const headerFixed = themeConfig.navbar.type === 'fixed';
  const headerStatic = themeConfig.navbar.type === 'static';
  const headerBlur = themeConfig.navbar.blur === true;
  const headerContentCompact = navbarContentWidth === 'compact';
  const headerContentWide = navbarContentWidth === 'wide';

  return (
    <StyledHeader
      overrideStyles={overrideStyles}
      className={classnames(horizontalLayoutClasses.header, {
        [horizontalLayoutClasses.headerFixed]: headerFixed,
        [horizontalLayoutClasses.headerStatic]: headerStatic,
        [horizontalLayoutClasses.headerBlur]: headerBlur,
        [horizontalLayoutClasses.headerContentCompact]: headerContentCompact,
        [horizontalLayoutClasses.headerContentWide]: headerContentWide,
      })}
    >
      {children}
    </StyledHeader>
  );
};

export default Header;