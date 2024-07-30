import type { ReactNode } from 'react';

import Dialog from '@mui/material/Dialog';

import type { Breakpoint } from '@mui/system';

import Box from '@mui/material/Box';
import { ModalHeader } from '@/components/dialogs/custom-dialog/ModalHeader';

type Props = {
  title: string;
  icon?: ReactNode | string;
  open: boolean;
  setOpen: (open: boolean) => void;
  maxWidth?: Breakpoint;
  fullWidth?: boolean;
  children: ReactNode;
  classes?: string;
};

const DesktopDialog = ({
  open,
  setOpen,
  title,
  icon,
  maxWidth = 'sm',
  fullWidth = true,
  children,
  classes,
}: Props) => (
  <Dialog
    open={open}
    maxWidth={maxWidth}
    fullWidth={fullWidth}
    scroll="body"
    onClose={() => {
      setOpen(false);
    }}
    classes={{
      root: classes,
    }}
  >
    <ModalHeader title={title} icon={icon} setOpen={setOpen} />
    <Box className="p-5">{children}</Box>
  </Dialog>
);

export default DesktopDialog;
