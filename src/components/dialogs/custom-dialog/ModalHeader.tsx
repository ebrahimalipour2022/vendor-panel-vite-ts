import type { ReactNode } from 'react';

import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { CloseOutlined } from '@mui/icons-material';

type ModalHeaderProps = {
  title: ReactNode | string;
  icon: ReactNode | string;
  setOpen: (value: boolean) => void;
};

export const ModalHeader = ({ title, icon: Icon, setOpen }: ModalHeaderProps) => {
  return (
    <DialogTitle
      variant="body1"
      fontWeight={'bold'}
      color={'primary'}
      className="modal-header-class flex gap-2 bg-[var(--mui-palette-action-disabledBackground)] m-2 rounded-md px-2"
    >
      <div className={'flex flex-row items-center justify-center gap-1'}>
        {Icon ? (
          <Box
            sx={{
              height: 24,
              width: 24,
              maxHeight: 24,
              maxWidth: 24,
              '& i, & svg , & *': {
                fontSize: '1.5rem',
                color: 'var(--mui-palette-primary-main)',
                fill: 'var(--mui-palette-primary-main)',
              },
            }}
          >
            {Icon}
          </Box>
        ) : null}
        <div className={'mt-1'}>{title}</div>
      </div>
      <IconButton
        onClick={() => setOpen(false)}
        className="absolute block-start-4 inline-end-4 mt-1 -ml-1"
      >
        {/*<i className='ri-close-line text-textSecondary' />*/}
        <CloseOutlined color={'primary'} />
      </IconButton>
    </DialogTitle>
  );
};
