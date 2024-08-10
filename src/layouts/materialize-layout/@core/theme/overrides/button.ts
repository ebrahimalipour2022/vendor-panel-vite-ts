// MUI Imports
import type { Theme } from '@mui/material/styles';

// Config Imports
import themeConfig from '@/layouts/materialize-layout/configs/themeConfig';

const loadingIndicator = {
  '& .MuiLoadingButton-loadingIndicator': {
    color: 'var(--mui-palette-common-white)',
    '& .MuiCircularProgress-root svg': {
      width: 18,
      height: 18,
    },
  },
};

const iconStyles = (size?: string, theme?: any) => ({
  '& > *:nth-of-type(1)': {
    ...(size === 'small'
      ? {
          fontSize: '16px',
          height: theme.spacing(4),
          width: theme.spacing(4),
        }
      : {
          ...(size === 'medium'
            ? {
                fontSize: '20px',
                height: theme.spacing(5),
                width: theme.spacing(5),
              }
            : {
                fontSize: '20px',
                height: theme.spacing(5),
                width: theme.spacing(5),
              }),
        }),
  },
});

const button: Theme['components'] = {
  MuiButtonBase: {
    defaultProps: {
      disableRipple: themeConfig.disableRipple,
    },
  },
  MuiButton: {
    styleOverrides: {
      root: ({ theme, ownerState }) => ({
        borderRadius: 'var(--mui-shape-customBorderRadius-lg)',
        '&.Mui-disabled': {
          opacity: 0.45,
        },
        ...(ownerState.variant === 'text'
          ? {
              ...(ownerState.size === 'small' && {
                padding: theme.spacing(1.75, 2.75),
              }),
              ...(ownerState.size === 'medium' && {
                padding: theme.spacing(2.44, 5.25),
              }),
              ...(ownerState.size === 'large' && {
                padding: theme.spacing(2.95, 6.25),
              }),
            }
          : {
              ...(ownerState.variant === 'outlined'
                ? {
                    ...(ownerState.size === 'small' && {
                      padding: theme.spacing(1.75, 2.75),
                    }),
                    ...(ownerState.size === 'medium' && {
                      padding: theme.spacing(2.44, 5.25),
                    }),
                    ...(ownerState.size === 'large' && {
                      padding: theme.spacing(2.75, 6.25),
                    }),
                  }
                : {
                    ...(ownerState.size === 'small' && {
                      padding: theme.spacing(1.75, 2.75),
                    }),
                    ...(ownerState.size === 'medium' && {
                      padding: theme.spacing(2.44, 5.25),
                    }),
                    ...(ownerState.size === 'large' && {
                      padding: theme.spacing(2.95, 6.25),
                    }),
                  }),
            }),
      }),
      contained: ({ ownerState }) => ({
        boxShadow: 'var(--mui-customShadows-xs)',
        ...(!ownerState.disabled && {
          '&:hover, &.Mui-focusVisible': {
            boxShadow: 'var(--mui-customShadows-xs)',
          },
          '&:active': {
            boxShadow: 'none',
          },
        }),
        ...loadingIndicator,
      }),
      sizeSmall: ({ theme }) => ({
        fontSize: theme.typography.button.fontSize,
        fontWeight: theme.typography.fontWeightMedium,
        borderRadius: 'var(--mui-shape-customBorderRadius-md)',
      }),
      sizeMedium: ({ theme }) => ({
        fontWeight: theme.typography.fontWeightMedium,
        fontSize: theme.typography.button.fontSize,
      }),
      sizeLarge: ({ theme }) => ({
        fontSize: theme.typography.button.fontSize,
        fontWeight: theme.typography.fontWeightMedium,
        borderRadius: 'var(--mui-shape-customBorderRadius-lg)',
      }),
      startIcon: ({ theme, ownerState }) => ({
        ...(ownerState.size === 'small'
          ? {
              marginInlineEnd: theme.spacing(1.5),
            }
          : {
              ...(ownerState.size === 'medium'
                ? {
                    marginInlineEnd: theme.spacing(2),
                  }
                : {
                    marginInlineEnd: theme.spacing(2.5),
                  }),
            }),
        ...iconStyles(ownerState.size, theme),
      }),
      endIcon: ({ theme, ownerState }) => ({
        ...(ownerState.size === 'small'
          ? {
              marginInlineStart: theme.spacing(1.5),
            }
          : {
              ...(ownerState.size === 'medium'
                ? {
                    marginInlineStart: theme.spacing(2),
                  }
                : {
                    marginInlineStart: theme.spacing(2.5),
                  }),
            }),
        ...iconStyles(ownerState.size, theme),
      }),
    },
    variants: [
      {
        props: { variant: 'text', color: 'primary' },
        style: {
          '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))':
            {
              backgroundColor: 'var(--mui-palette-primary-lighterOpacity)',
            },
          '&.Mui-disabled': {
            color: 'var(--mui-palette-primary-main)',
          },
        },
      },
      {
        props: { variant: 'text', color: 'secondary' },
        style: {
          '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))':
            {
              backgroundColor: 'var(--mui-palette-secondary-lighterOpacity)',
            },
          '&.Mui-disabled': {
            color: 'var(--mui-palette-secondary-main)',
          },
        },
      },
      {
        props: { variant: 'text', color: 'error' },
        style: {
          '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))':
            {
              backgroundColor: 'var(--mui-palette-error-lighterOpacity)',
            },
          '&.Mui-disabled': {
            color: 'var(--mui-palette-error-main)',
          },
        },
      },
      {
        props: { variant: 'text', color: 'warning' },
        style: {
          '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))':
            {
              backgroundColor: 'var(--mui-palette-warning-lighterOpacity)',
            },
          '&.Mui-disabled': {
            color: 'var(--mui-palette-warning-main)',
          },
        },
      },
      {
        props: { variant: 'text', color: 'info' },
        style: {
          '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))':
            {
              backgroundColor: 'var(--mui-palette-info-lighterOpacity)',
            },
          '&.Mui-disabled': {
            color: 'var(--mui-palette-info-main)',
          },
        },
      },
      {
        props: { variant: 'text', color: 'success' },
        style: {
          '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))':
            {
              backgroundColor: 'var(--mui-palette-success-lighterOpacity)',
            },
          '&.Mui-disabled': {
            color: 'var(--mui-palette-success-main)',
          },
        },
      },
      {
        props: { variant: 'outlined', color: 'primary' },
        style: {
          backgroundColor: 'var(--mui-palette-primary-lightestOpacity)',
          borderColor: 'var(--mui-palette-primary-lightestOpacity)',
          '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))':
            {
              borderColor: 'var(--mui-palette-primary-lightestOpacity)',
              backgroundColor: 'var(--mui-palette-primary-lighterOpacity)',
            },
          '&.Mui-disabled': {
            opacity: 0.45,
            color: 'var(--mui-palette-primary-main)',
          },
        },
      },
      {
        props: { variant: 'outlined', color: 'secondary' },
        style: {
          borderColor: 'var(--mui-palette-secondary-main)',
          '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))':
            {
              backgroundColor: 'var(--mui-palette-secondary-lighterOpacity)',
            },
          '&.Mui-disabled': {
            color: 'var(--mui-palette-secondary-main)',
            borderColor: 'var(--mui-palette-secondary-main)',
          },
        },
      },
      {
        props: { variant: 'outlined', color: 'error' },
        style: {
          backgroundColor: 'var(--mui-palette-error-lightestOpacity)',
          borderColor: 'var(--mui-palette-error-lightestOpacity)',
          '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))':
            {
              borderColor: 'var(--mui-palette-error-lightestOpacity)',
              backgroundColor: 'var(--mui-palette-error-lighterOpacity)',
            },
          '&.Mui-disabled': {
            opacity: 0.45,
            color: 'var(--mui-palette-error-main)',
          },
        },
      },
      {
        props: { variant: 'outlined', color: 'warning' },
        style: {
          borderColor: 'var(--mui-palette-warning-main)',
          '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))':
            {
              backgroundColor: 'var(--mui-palette-warning-lighterOpacity)',
            },
          '&.Mui-disabled': {
            color: 'var(--mui-palette-warning-main)',
            borderColor: 'var(--mui-palette-warning-main)',
          },
        },
      },
      {
        props: { variant: 'outlined', color: 'info' },
        style: {
          borderColor: 'var(--mui-palette-info-main)',
          '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))':
            {
              backgroundColor: 'var(--mui-palette-info-lighterOpacity)',
            },
          '&.Mui-disabled': {
            color: 'var(--mui-palette-info-main)',
            borderColor: 'var(--mui-palette-info-main)',
          },
        },
      },
      {
        props: { variant: 'outlined', color: 'success' },
        style: {
          borderColor: 'var(--mui-palette-success-main)',
          '&:not(.Mui-disabled):hover, &:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))':
            {
              backgroundColor: 'var(--mui-palette-success-lighterOpacity)',
            },
          '&.Mui-disabled': {
            color: 'var(--mui-palette-success-main)',
            borderColor: 'var(--mui-palette-success-main)',
          },
        },
      },
      {
        props: { variant: 'contained', color: 'primary' },
        style: {
          '&:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))': {
            backgroundColor: 'var(--mui-palette-primary-dark)',
          },
          '&.Mui-disabled': {
            color: 'var(--mui-palette-primary-contrastText)',
            backgroundColor: 'var(--mui-palette-primary-main)',
          },
        },
      },
      {
        props: { variant: 'contained', color: 'secondary' },
        style: {
          '&:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))': {
            backgroundColor: 'var(--mui-palette-secondary-dark)',
          },
          '&.Mui-disabled': {
            color: 'var(--mui-palette-secondary-contrastText)',
            backgroundColor: 'var(--mui-palette-secondary-main)',
          },
        },
      },
      {
        props: { variant: 'contained', color: 'error' },
        style: {
          '&:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))': {
            backgroundColor: 'var(--mui-palette-error-dark)',
          },
          '&.Mui-disabled': {
            color: 'var(--mui-palette-error-contrastText)',
            backgroundColor: 'var(--mui-palette-error-main)',
          },
        },
      },
      {
        props: { variant: 'contained', color: 'warning' },
        style: {
          '&:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))': {
            backgroundColor: 'var(--mui-palette-warning-dark)',
          },
          '&.Mui-disabled': {
            color: 'var(--mui-palette-warning-contrastText)',
            backgroundColor: 'var(--mui-palette-warning-main)',
          },
        },
      },
      {
        props: { variant: 'contained', color: 'info' },
        style: {
          '&:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))': {
            backgroundColor: 'var(--mui-palette-info-dark)',
          },
          '&.Mui-disabled': {
            color: 'var(--mui-palette-info-contrastText)',
            backgroundColor: 'var(--mui-palette-info-main)',
          },
        },
      },
      {
        props: { variant: 'contained', color: 'success' },
        style: {
          '&:not(.Mui-disabled):active, &.Mui-focusVisible:not(:has(span.MuiTouchRipple-root))': {
            backgroundColor: 'var(--mui-palette-success-dark)',
          },
          '&.Mui-disabled': {
            color: 'var(--mui-palette-success-contrastText)',
            backgroundColor: 'var(--mui-palette-success-main)',
          },
        },
      },
    ],
  },
};

export default button;
