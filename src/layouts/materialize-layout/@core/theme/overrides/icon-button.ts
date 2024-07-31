// MUI Imports
import type { Theme } from '@mui/material/styles';

// Config Imports
import themeConfig from '@/layouts/materialize-layout/configs/themeConfig';

const iconButton: Theme['components'] = {
  MuiIconButton: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: theme.spacing(1),
        '& .MuiSvgIcon-root, & i, & svg': {
          fontSize: 'inherit',
          height: theme.spacing(5),
          width: theme.spacing(5),
        },
      }),
      sizeSmall: ({ theme }) => ({
        padding: theme.spacing(1),
        fontSize: '1rem',
      }),
      sizeMedium: ({ theme }) => ({
        padding: theme.spacing(2.5),
        fontSize: '1.375rem',
      }),
      sizeLarge: ({ theme }) => ({
        padding: theme.spacing(2.25),
        fontSize: '1.5rem',
      }),
    },
    variants: [
      {
        props: { color: 'default' },
        style: {
          '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active': {
            backgroundColor: 'rgb(var(--mui-palette-text-primaryChannel) / 0.08)',
          },
          ...(themeConfig.disableRipple && {
            '&.Mui-focusVisible:not(.Mui-disabled)': {
              backgroundColor: 'rgb(var(--mui-palette-text-primaryChannel) / 0.08)',
            },
          }),
          '&.Mui-disabled': {
            opacity: 0.45,
            color: 'var(--mui-palette-action-active)',
          },
        },
      },
      {
        props: { color: 'primary' },
        style: {
          backgroundColor: 'var(--mui-palette-primary-main)',
          '& .MuiSvgIcon-root, & i, & svg': {
            color: 'var(--mui-palette-primary-contrastText)',
            fill: 'var(--mui-palette-primary-contrastText)',
          },
          '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active': {
            backgroundColor: 'var(--mui-palette-primary-light)',
          },
          ...(themeConfig.disableRipple && {
            '&.Mui-focusVisible:not(.Mui-disabled)': {
              backgroundColor: 'var(--mui-palette-primary-lighterOpacity)',
            },
          }),
          '&.Mui-disabled': {
            opacity: 0.45,
            color: 'var(--mui-palette-primary-main)',
          },
        },
      },
      {
        props: { color: 'secondary' },
        style: {
          backgroundColor: 'var(--mui-palette-primary-lightestOpacity)',
          '& .MuiSvgIcon-root, & i, & svg': {
            color: 'var(--mui-palette-primary-main)',
            fill: 'var(--mui-palette-primary-main)',
          },
          '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active': {
            backgroundColor: 'var(--mui-palette-primary-lighterOpacity)',
          },
          ...(themeConfig.disableRipple && {
            '&.Mui-focusVisible:not(.Mui-disabled)': {
              backgroundColor: 'var(--mui-palette-primary-lighterOpacity)',
            },
          }),
          '&.Mui-disabled': {
            opacity: 0.45,
            color: 'var(--mui-palette-primary-light)',
          },
        },
        // style: {
        //   '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active': {
        //     backgroundColor: 'var(--mui-palette-secondary-lighterOpacity)'
        //   },
        //   ...(themeConfig.disableRipple && {
        //     '&.Mui-focusVisible:not(.Mui-disabled)': { backgroundColor: 'var(--mui-palette-secondary-lighterOpacity)' }
        //   }),
        //   '&.Mui-disabled': {
        //     opacity: 0.45,
        //     color: 'var(--mui-palette-secondary-main)'
        //   }
        // }
      },
      {
        props: { color: 'error' },
        style: {
          '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active': {
            backgroundColor: 'var(--mui-palette-error-lighterOpacity)',
          },
          ...(themeConfig.disableRipple && {
            '&.Mui-focusVisible:not(.Mui-disabled)': {
              backgroundColor: 'var(--mui-palette-error-lighterOpacity)',
            },
          }),
          '&.Mui-disabled': {
            opacity: 0.45,
            color: 'var(--mui-palette-error-main)',
          },
        },
      },
      {
        props: { color: 'warning' },
        style: {
          '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active': {
            backgroundColor: 'var(--mui-palette-warning-lighterOpacity)',
          },
          ...(themeConfig.disableRipple && {
            '&.Mui-focusVisible:not(.Mui-disabled)': {
              backgroundColor: 'var(--mui-palette-warning-lighterOpacity)',
            },
          }),
          '&.Mui-disabled': {
            opacity: 0.45,
            color: 'var(--mui-palette-warning-main)',
          },
        },
      },
      {
        props: { color: 'info' },
        style: {
          '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active': {
            backgroundColor: 'var(--mui-palette-info-lighterOpacity)',
          },
          ...(themeConfig.disableRipple && {
            '&.Mui-focusVisible:not(.Mui-disabled)': {
              backgroundColor: 'var(--mui-palette-info-lighterOpacity)',
            },
          }),
          '&.Mui-disabled': {
            opacity: 0.45,
            color: 'var(--mui-palette-info-main)',
          },
        },
      },
      {
        props: { color: 'success' },
        style: {
          '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active': {
            backgroundColor: 'var(--mui-palette-success-lighterOpacity)',
          },
          ...(themeConfig.disableRipple && {
            '&.Mui-focusVisible:not(.Mui-disabled)': {
              backgroundColor: 'var(--mui-palette-success-lighterOpacity)',
            },
          }),
          '&.Mui-disabled': {
            opacity: 0.45,
            color: 'var(--mui-palette-success-main)',
          },
        },
      },
    ],
  },
};

export default iconButton;
