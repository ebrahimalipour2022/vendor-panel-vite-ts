// Third-party Imports
import classnames from 'classnames';

// Type Imports
import type { ChildrenType } from '@/layouts/materialize-layout/@core/types';

// Config Imports
import themeConfig from '@/layouts/materialize-layout/configs/themeConfig';

// Hook Imports
import { useSettings } from '@/layouts/materialize-layout/@core/hooks/useSettings';

// Util Imports
import { horizontalLayoutClasses } from '@/layouts/materialize-layout/@layouts/utils/layoutClasses';

// Styled Component Imports
import StyledMain from '@/layouts/materialize-layout/@layouts/styles/shared/StyledMain';

const LayoutContent = ({ children }: ChildrenType) => {
  // Hooks
  const { settings } = useSettings();

  // Vars
  const contentCompact = settings.contentWidth === 'compact';
  const contentWide = settings.contentWidth === 'wide';

  return (
    <StyledMain
      isContentCompact={contentCompact}
      className={classnames(horizontalLayoutClasses.content, 'flex-auto', {
        [`${horizontalLayoutClasses.contentCompact} is-full`]: contentCompact,
        [horizontalLayoutClasses.contentWide]: contentWide,
      })}
      style={{ padding: themeConfig.layoutPadding }}
    >
      {children}
    </StyledMain>
  );
};

export default LayoutContent;
