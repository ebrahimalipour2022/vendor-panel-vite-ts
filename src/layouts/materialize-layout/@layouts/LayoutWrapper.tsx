// React Imports
import type { ReactElement } from 'react';

// Type Imports
import Box from '@mui/material/Box';

import type { SystemMode } from '@/layouts/materialize-layout/@core/types';

// Hook Imports
import { useSettings } from '@/layouts/materialize-layout/@core/hooks/useSettings';
import useLayoutInit from '@/layouts/materialize-layout/@core/hooks/useLayoutInit';
import themeConfig from '@/layouts/materialize-layout/configs/themeConfig';

type LayoutWrapperProps = {
  systemMode: SystemMode;
  verticalLayout: ReactElement;
  horizontalLayout?: ReactElement;
};

const LayoutWrapper = (props: LayoutWrapperProps) => {
  // Props
  const { systemMode, verticalLayout, horizontalLayout } = props;

  // Hooks
  const { settings } = useSettings();

  useLayoutInit(systemMode);

  // Return the layout based on the layout context
  return (
    <Box
      component={'div'}
      id={'LayoutWrapper'}
      data-skin={settings.skin}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flex: 'auto',
        p: `${themeConfig.rootLayoutPadding}px`,
      }}
    >
      {settings.layout === 'horizontal' ? horizontalLayout : verticalLayout}
    </Box>
  );
};

export default LayoutWrapper;
