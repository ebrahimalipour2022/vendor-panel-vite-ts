// Third-party Imports
import classnames from 'classnames';

// Type Imports
import type { ChildrenType } from '@/layouts/materialize-layout/@core/types';

// Util Imports
import { horizontalLayoutClasses } from '@/layouts/materialize-layout/@layouts/utils/layoutClasses';

const Navbar = ({ children }: ChildrenType) => {
  return (
    <div
      className={classnames(
        horizontalLayoutClasses.navbar,
        'flex items-center justify-between is-full'
      )}
    >
      {children}
    </div>
  );
};

export default Navbar;
