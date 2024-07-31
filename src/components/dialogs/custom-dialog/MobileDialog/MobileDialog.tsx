import type { ReactElement, ReactNode, Ref } from 'react';
import { forwardRef } from 'react';

import Dialog from '@mui/material/Dialog';

import type { Breakpoint } from '@mui/system';

import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';

import type { TransitionProps } from '@mui/material/transitions';

import { styled } from '@mui/material/styles';

import classnames from 'classnames';

import { ModalHeader } from '@/components/dialogs/custom-dialog/ModalHeader';

const drawerBleeding = 4;

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
    dir: 'left' | 'right' | 'up' | 'down';
  },
  ref: Ref<unknown>
) {
  return <Slide direction={props?.dir} ref={ref} {...props} />;
});

type Props = {
  title?: string;
  icon?: ReactNode | string;
  open: boolean;
  setOpen: (open: boolean) => void;
  puller?: boolean;
  maxWidth?: Breakpoint;
  fullWidth?: boolean;
  children: ReactNode;
  transition?: 'left' | 'right' | 'up' | 'down';
  classes?: string;
};

const StyledBox = styled('div')(({ theme }) => ({
  // backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800]
}));

const Puller = styled('div')(({ theme }) => ({
  width: 48,
  height: 4,
  // backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
  backgroundColor: 'var(--mui-palette-customColors-inputBorder)',
  borderRadius: 24,
  position: 'absolute',
  top: 12,
  left: 'calc(50% - 15px)',
}));

// TODO: may be can replace with https://mui.com/material-ui/react-drawer/#swipeable-edge
const MobileDialog = ({
  open,
  setOpen,
  title,
  icon,
  maxWidth = 'sm',
  fullWidth = true,
  puller,
  children,
  classes,
}: Props) => {
  return (
    <Dialog
      open={open}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      TransitionComponent={Transition as any}
      keepMounted
      TransitionProps={{
        dir: 'up',
      }}
      // scroll='paper'
      onClose={() => {
        setOpen(false);
      }}
      classes={{
        root: classes,
        paper:
          '!mx-auto !my-0 fixed bottom-2 left-2 right-2 !w-[calc(100%_-_1rem)] overflow-auto max-h-[90dvh] min-h-[20dvh]',
      }}
    >
      {puller && (
        <StyledBox
          sx={{
            position: 'absolute',
            top: drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: 'visible',
            right: 0,
            left: 0,
          }}
        >
          <Puller />
        </StyledBox>
      )}
      {title && <ModalHeader title={title} icon={icon} setOpen={setOpen} />}
      <Box className={classnames('p-2', 'overflow-auto', { 'pt-6': puller })}>{children}</Box>
    </Dialog>
  );
};

export default MobileDialog;
