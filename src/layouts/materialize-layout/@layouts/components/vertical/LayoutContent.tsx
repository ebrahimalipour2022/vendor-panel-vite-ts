// Third-party Imports
import classnames from 'classnames';

// Type Imports
import Box from '@mui/material/Box';

import type { ChildrenType } from '@/layouts/materialize-layout/@core/types';

// Hook Imports
import { useSettings } from '@/layouts/materialize-layout/@core/hooks/useSettings';

// Util Imports
import { verticalLayoutClasses } from '@/layouts/materialize-layout/@layouts/utils/layoutClasses';

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
      className={classnames(verticalLayoutClasses.content, 'flex-auto', {
        [`${verticalLayoutClasses.contentCompact} is-full`]: contentCompact,
        [verticalLayoutClasses.contentWide]: contentWide,
      })}
    >
      <Box
        minHeight={'calc(100vh - 64px - 48px)'}
        className={'rounded-3xl p-4 bg-[var(--mui-palette-background-paper)] relative'}
      >
        {children}
      </Box>
    </StyledMain>
  );
};

export default LayoutContent;
