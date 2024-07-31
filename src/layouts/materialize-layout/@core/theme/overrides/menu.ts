// MUI Imports
import type { Theme } from '@mui/material/styles';

// Type Imports
import type { Skin } from '@/layouts/materialize-layout/@core/types';

const menu = (skin: Skin): Theme['components'] => ({
  MuiMenu: {
    defaultProps: {
      ...(skin === 'bordered' && {
        slotProps: {
          paper: {
            elevation: 0,
          },
        },
      }),
    },
    styleOverrides: {
      paper: ({ theme }) => ({
        padding: theme.spacing(2),
        marginBlockStart: theme.spacing(0.5),
        ...(skin !== 'bordered' && {
          boxShadow: 'var(--mui-customShadows-lg)',
        }),
        [theme.breakpoints.down('sm')]: {
          position: 'fixed',
          bottom: 12,
          maxWidth: 'calc(100% - 24px) !important',
          top: 'unset !important',
          left: '12px !important',
          right: '12px !important',
          height: 'max-content',
          transformOrigin: 'unset !important',
        },
      }),
    },
  },
  MuiMenuItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        paddingBlock: theme.spacing(3),
        paddingInline: theme.spacing(4),
        gap: theme.spacing(2),
        color: 'var(--mui-palette-text-primary)',
        fontSize: theme.typography.body2.fontSize,
        fontWeight: theme.typography.fontWeightMedium,
        // width: theme.spacing(60),
        '& i, & svg': {
          fontSize: '1.375rem',
        },
        '& .MuiListItemIcon-root': {
          minInlineSize: 0,
        },
        '&.Mui-selected': {
          backgroundColor: 'var(--mui-palette-primary-main)',
          color: 'var(--mui-palette-primary-contrastText)',
          '& .MuiListItemIcon-root': {
            color: 'var(--mui-palette-primary-contrastText)',
          },
          '&:hover, &.Mui-focused, &.Mui-focusVisible': {
            backgroundColor: 'var(--mui-palette-primary-light)',
          },
        },
        '&:not(.Mui-selected):not(.Mui-disabled)': {
          '&:hover': {
            backgroundColor: 'var(--mui-palette-action-hover)',
          },
        },
        '&.Mui-disabled': {
          color: 'var(--mui-palette-text-disabled)',
          opacity: 1,
        },
        [theme.breakpoints.down('sm')]: {
          width: '100% !important',
          // maxWidth: '100% !important',
        },
      }),
    },
  },
});

export default menu;
