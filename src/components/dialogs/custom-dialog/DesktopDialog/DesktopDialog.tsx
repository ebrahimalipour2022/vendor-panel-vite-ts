import type { ReactNode } from 'react';

import Dialog, { DialogClasses } from '@mui/material/Dialog';

import type { Breakpoint } from '@mui/system';

import Box from '@mui/material/Box';

import { ModalHeader } from '@/components/dialogs/custom-dialog/ModalHeader';
import { PaperProps } from '@mui/material';

type Props = {
  title: string;
  icon?: ReactNode | string;
  open: boolean;
  scroll?: boolean;
  setOpen: (open: boolean) => void;
  maxWidth?: Breakpoint;
  fullWidth?: boolean;
  children: ReactNode;
  classes?: Partial<DialogClasses> | undefined;
  PaperProps?: Partial<PaperProps<React.ElementType>>;
};

const DesktopDialog = ({
  open,
  setOpen,
  title,
  icon,
  scroll = true,
  maxWidth = 'sm',
  fullWidth = true,
  children,
  classes,
  PaperProps,
  ...rest
}: Props) => {
  return (
    <Dialog
      open={open}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      scroll={scroll ? 'body' : undefined}
      onClose={() => {
        setOpen(false);
      }}
      classes={classes}
      PaperProps={PaperProps}
      {...rest}
    >
      <ModalHeader title={title} icon={icon} setOpen={setOpen} />
      <Box className={'p-5'}>{children}</Box>
    </Dialog>
  );
};

export default DesktopDialog;
