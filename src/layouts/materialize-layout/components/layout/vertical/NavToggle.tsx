// Hook Imports
import IconButton from '@mui/material/IconButton';

import useVerticalNav from '@/layouts/materialize-layout/@menu/hooks/useVerticalNav';

const NavToggle = () => {
  // Hooks
  const { toggleVerticalNav, isBreakpointReached } = useVerticalNav();

  const handleClick = () => {
    toggleVerticalNav();
  };

  return (
    <>
      {/* <i className='ri-menu-line text-xl cursor-pointer' onClick={handleClick} /> */}
      {/* Comment following code and uncomment above code in order to toggle menu on desktop screens as well */}
      {isBreakpointReached && (
        <IconButton onClick={handleClick} color={'secondary'} className="text-textPrimary">
          <i className="ri-menu-line text-xl cursor-pointer" />
        </IconButton>
      )}
    </>
  );
};

export default NavToggle;
