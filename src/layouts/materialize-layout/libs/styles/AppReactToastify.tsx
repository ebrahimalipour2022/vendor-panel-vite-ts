// MUI Imports
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled } from '@mui/material/styles';
import type { BoxProps } from '@mui/material/Box';
import type { Theme } from '@mui/material/styles';

// Third-party Imports
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import type { ToastContainerProps, ToastPosition } from 'react-toastify';

// Type Imports
import type { Direction } from '@/layouts/materialize-layout/@core/types';

// Config Imports
import themeConfig from '@/layouts/materialize-layout/configs/themeConfig';

// Hook Imports
import { useSettings } from '@/layouts/materialize-layout/@core/hooks/useSettings';

type Props = ToastContainerProps & {
  boxProps?: BoxProps;
  direction?: Direction;
};

// Styled Components
const ToastifyWrapper = styled(Box)<BoxProps>(({ theme }) => {
  // Hooks
  const { settings } = useSettings();
  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down(480));

  return {
    ...(isSmallScreen && {
      '& .Toastify__toast-container': {
        marginBlockStart: theme.spacing(3),
        marginInline: theme.spacing(3),
        width: 'calc(100dvw - 1.5rem)',
      },
    }),
    '& .Toastify__toast': {
      minBlockSize: 46,
      borderRadius: 'var(--mui-shape-customBorderRadius-lg)',
      padding: theme.spacing(2, 2.5),
      backgroundColor: 'var(--mui-palette-background-paper)',
      boxShadow: settings.skin === 'bordered' ? 'none' : 'var(--mui-customShadows-md)',
      border: settings.skin === 'bordered' && `1px solid ${theme.palette.divider}`,
      ...(isSmallScreen && {
        marginBlockEnd: theme.spacing(4),
      }),
      '&:not(.custom-toast)': {
        '& .Toastify__toast-body': {
          color: 'var(--mui-palette-common-white)',
          fontWeight: 500,
        },
        '&.Toastify__toast--success': {
          background: 'var(--mui-palette-success-main)',
          '& .Toastify__toast-icon svg': {
            fill: 'var(--mui-palette-common-white)',
          },
        },
        '&.Toastify__toast--error': {
          background: 'var(--mui-palette-error-main)',
          '& .Toastify__toast-icon svg': {
            fill: 'var(--mui-palette-common-white)',
          },
        },
        '&.Toastify__toast--warning': {
          background: 'var(--mui-palette-warning-main)',
          '& .Toastify__toast-icon svg': {
            fill: 'var(--mui-palette-warning-main)',
          },
        },
        '&.Toastify__toast--info': {
          background: 'var(--mui-palette-info-main)',
          '& .Toastify__toast-icon svg': {
            fill: 'var(--mui-palette-common-white)',
          },
        },
      },
    },
    '& .Toastify__toast-body': {
      margin: 0,
      lineHeight: 1.467,
      fontSize: theme.typography.body1.fontSize,
      fontFamily: themeConfig.fontFamily,
    },
    '& .Toastify__toast-icon': {
      marginRight: theme.spacing(3),
      height: 24,
      width: 24,
      '& .Toastify__spinner': {
        margin: 3,
        height: 14,
        width: 14,
      },
    },
    '& .Toastify__close-button': {
      color: 'var(--mui-palette-common-white)',
      opacity: 1,
    },
  };
});

const AppReactToastify = (props: Props) => {
  const { boxProps, direction = 'rtl', ...rest } = props;

  const positionMap: Partial<Record<ToastPosition, ToastPosition>> = {
    'top-right': 'top-left',
    'top-left': 'top-right',
    'bottom-left': 'bottom-right',
    'bottom-right': 'bottom-left',
    'top-center': 'top-center',
    'bottom-center': 'bottom-center',
  };

  const position =
    direction === 'rtl' ? positionMap[themeConfig.toastPosition] : themeConfig.toastPosition;

  return (
    <ToastifyWrapper {...boxProps}>
      <ToastContainer rtl={direction === 'rtl'} position={position} autoClose={4000} {...rest} />
    </ToastifyWrapper>
  );
};

export default AppReactToastify;
