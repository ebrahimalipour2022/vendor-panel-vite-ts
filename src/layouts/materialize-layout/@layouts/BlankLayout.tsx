// Third-party Imports
import classnames from 'classnames';

// Type Imports
import type { ChildrenType, SystemMode } from '@/layouts/materialize-layout/@core/types';

// Hook Imports
import { useSettings } from '@/layouts/materialize-layout/@core/hooks/useSettings';
import useLayoutInit from '@/layouts/materialize-layout/@core/hooks/useLayoutInit';

// Util Imports
import { blankLayoutClasses } from './utils/layoutClasses';

type Props = ChildrenType & {
  systemMode: SystemMode;
};

const BlankLayout = (props: Props) => {
  // Props
  const { children, systemMode } = props;

  // Hooks
  const { settings } = useSettings();

  useLayoutInit(systemMode);

  return (
    <div
      className={classnames(blankLayoutClasses.root, 'is-full bs-full')}
      data-skin={settings.skin}
    >
      {children}
    </div>
  );
};

export default BlankLayout;
