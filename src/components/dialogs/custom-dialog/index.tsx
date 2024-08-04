import type { ReactNode } from 'react';

import type { Breakpoint } from '@mui/system';
import { DialogClasses } from '@mui/material/Dialog';
import { PaperProps } from '@mui/material';
import MobileDialog from './MobileDialog/MobileDialog';
import DesktopDialog from './DesktopDialog/DesktopDialog';

type Props = {
  title: string;
  icon?: ReactNode | string;
  open: boolean;
  setOpen: (open: boolean) => void;
  maxWidth?: Breakpoint;
  maxHeight?: string;
  fullWidth?: boolean;
  children: ReactNode;
  transition?: 'left' | 'right' | 'up' | 'down';
  PaperProps?: Partial<PaperProps<React.ElementType>>;
  classes?: Partial<DialogClasses> | undefined;
};

const CDialog = ({
  open,
  setOpen,
  title,
  icon,
  maxWidth = 'sm',
  fullWidth = true,
  classes,
  children,
  PaperProps,
  ...rest
}: Props) => {
  return (
    <>
      <DesktopDialog
        title={title}
        icon={icon}
        setOpen={setOpen}
        open={open}
        maxWidth={maxWidth}
        fullWidth={fullWidth}
        PaperProps={PaperProps}
        classes={{
          root: 'hidden md:block',
        }}
        {...rest}
      >
        {children}
      </DesktopDialog>
      <MobileDialog
        title={title}
        icon={icon}
        setOpen={setOpen}
        open={open}
        maxWidth={maxWidth}
        fullWidth={fullWidth}
        classes={{
          root: 'block md:hidden',
        }}
        {...rest}
      >
        {children}
      </MobileDialog>
    </>
  );
};

export default CDialog;
