// MUI Imports
import type { Theme } from '@mui/material/styles'

const input: Theme['components'] = {
  MuiFormControl: {
    styleOverrides: {
      root: {
        '&:has(.MuiRadio-root) .MuiFormHelperText-root, &:has(.MuiCheckbox-root) .MuiFormHelperText-root, &:has(.MuiSwitch-root) .MuiFormHelperText-root':
          {
            marginInline: 0
          }
      }
    }
  },
  MuiInputBase: {
    styleOverrides: {
      root: ({ theme }) => ({
        lineHeight: 1.6,
        fontWeight: 500,
        // '& .MuiOutlinedInput-input': {
        //   padding: theme.spacing(4.2, 3)
        // },
        '&.MuiInput-underline': {
          '&:before': {
            borderColor: 'var(--mui-palette-customColors-inputBorder)'
          },
          '&:not(.Mui-disabled, .Mui-error):hover:before': {
            borderColor: 'var(--mui-palette-action-active)'
          },
          '&.Mui-disabled:before': {
            borderColor: 'var(--mui-palette-divider)',
            borderBlockEndStyle: 'solid'
          },
          '& + .MuiFormHelperText-root': {
            marginInline: 0
          }
        },
        '&.Mui-focused': {
          borderColor: 'var(--mui-palette-action-hover)',
          backgroundColor: 'var(--mui-palette-action-disabledBackground)'
        },
        '&.Mui-disabled .MuiInputAdornment-root, &.Mui-disabled .MuiInputAdornment-root > *': {
          color: 'var(--mui-palette-action-disabled)'
        },
        '&.MuiAutocomplete-inputRoot:not(.MuiInput-underline)': {
          paddingInlineStart: `${theme.spacing(4)} !important`
        },
        '&.Mui-error:not(.Mui-disabled) input': {
          '&::placeholder': {
            color: 'var(--mui-palette-error-main) !important'
          },
          '&::-webkit-input-placeholder': {
            color: 'var(--mui-palette-error-main) !important'
          }
        }
      }),
      inputAdornedStart: {
        paddingInlineStart: '0 !important'
      },
      inputAdornedEnd: {
        paddingInlineEnd: '0 !important'
      }
    }
  },
  MuiFilledInput: {
    styleOverrides: {
      root: ({ theme }) => ({
        '&.MuiInputBase-sizeSmall': {
          borderStartStartRadius: 'var(--mui-shape-customBorderRadius-md)',
          borderStartEndRadius: 'var(--mui-shape-customBorderRadius-md)'
        },
        '&:before': {
          borderBlockEnd: '1px solid var(--mui-palette-text-secondary)'
        },
        '&:hover:before': {
          borderBlockEnd: '1px solid var(--mui-palette-text-primary)'
        },
        '&.Mui-disabled:before': {
          borderBlockEndStyle: 'solid',
          opacity: 0.38
        },
        '&.MuiInputBase-multiline': {
          paddingInline: theme.spacing(4)
        },
        '&:has(.MuiInputAdornment-positionStart)': {
          paddingInlineStart: theme.spacing(4)
        },
        '&:has(.MuiInputAdornment-positionEnd)': {
          paddingInlineEnd: theme.spacing(4)
        }
      }),
      input: ({ theme }) => ({
        '&:not(.MuiInputBase-inputMultiline)': {
          paddingInline: theme.spacing(4)
        },
        blockSize: '1.534em'
      })
    }
  },
  MuiInputLabel: {
    styleOverrides: {
      root: {
        '&.MuiInputLabel-filled:not(.MuiInputLabel-shrink), &.MuiInputLabel-outlined:not(.MuiInputLabel-shrink)': {
          transform: 'translate(16px, 17px) scale(1)'
        }
      },
      shrink: ({ ownerState }) => ({
        ...(ownerState.variant === 'outlined' && {
          color: 'var(--mui-palette-text-secondary)',
          transform: 'translate(16px, -8px) scale(0.867)'
        }),
        ...(ownerState.variant === 'filled' && {
          transform: `translate(16px, ${ownerState.size === 'small' ? 4 : 7}px) scale(0.867)`
        }),
        ...(ownerState.variant === 'standard' && {
          transform: 'translate(0, -1.5px) scale(0.867)'
        })
      }),
      sizeSmall: {
        '&.MuiInputLabel-filled:not(.MuiInputLabel-shrink)': {
          transform: 'translate(16px, 13px) scale(1)'
        },
        '&.MuiInputLabel-outlined:not(.MuiInputLabel-shrink)': {
          transform: 'translate(16px, 9px) scale(1)'
        }
      }
    }
  },
  MuiFormLabel: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: 'var(--mui-palette-text-primary)',
        fontWeight: theme.typography.fontWeightBold,
        fontSize: theme.typography.caption.fontSize
      })
    }
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: ({ theme }) => ({
        fontSize: theme.typography.body2.fontSize,
        fontWeight: theme.typography.fontWeightMedium,
        '&.MuiInputBase-sizeSmall': {
          borderRadius: 'var(--mui-shape-customBorderRadius-md)',
          '&.MuiInputBase-multiline': {
            padding: theme.spacing(2, 4)
          }
        },
        '&.Mui-focused:not(.Mui-disabled)': {
          backgroundColor: 'var(--mui-palette-action-disabledBackground)',
          '&:not(.MuiInputAdornment-positionStart)': {
            '& i, & svg': {
              fill: 'var(--mui-palette-primary-main) !important',
              color: 'var(--mui-palette-primary-main) !important'
            }
          }
        },
        '&:not(.Mui-focused):not(.Mui-error):not(.Mui-disabled):hover .MuiOutlinedInput-notchedOutline': {
          borderColor: 'var(--mui-palette-action-hover)',
          input: {
            backgroundColor: 'var(--mui-palette-action-disabledBackground)'
          }
        },
        '&:not(.Mui-focused):not(.Mui-error):not(.Mui-disabled):hover input': {
          backgroundColor: 'var(--mui-palette-action-disabledBackground)'
        },
        '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
          borderColor: 'var(--mui-palette-divider)',
          backgroundColor: 'var(--mui-palette-action-disabledBackground)',
          zIndex: -1
        },
        '&.Mui-disabled input': {
          opacity: 0.5
        },
        '&.Mui-disabled .MuiInputAdornment-root': {
          opacity: 0.5,
          color: 'var(--mui-palette-text-primary)'
        },
        '&.MuiInputBase-multiline': {
          padding: theme.spacing(4)
        },
        '&:has(.MuiInputAdornment-positionStart)': {
          paddingInlineStart: theme.spacing(4)
        },
        '&:has(.MuiInputAdornment-positionEnd)': {
          paddingInlineEnd: theme.spacing(4)
        }
      }),
      input: ({ theme, ownerState }) => ({
        ...(ownerState?.size === 'medium' && {
          '&:not(.MuiInputBase-inputMultiline)': {
            padding: theme.spacing(4)
          }
        }),
        ...(ownerState?.size === 'small' && {
          '&:not(.MuiInputBase-inputMultiline)': {
            padding: theme.spacing(2, 4)
          }
        }),
        blockSize: '1em',
        '& ~ .MuiOutlinedInput-notchedOutline': {
          borderColor: 'var(--mui-palette-customColors-inputBorder)'
        },
        '&::placeholder': {
          textOverflow: 'ellipsis !important',
          color: 'var(--mui-mainColorChannels-surface4)',
          opacity: 1
        }
      }),
      notchedOutline: {
        '& legend': {
          fontSize: '0.867em',
          marginInlineStart: 2
        }
      }
    }
  },
  MuiInputAdornment: {
    styleOverrides: {
      root: {
        color: 'var(--mui-palette-text-primary)',
        '& i, & svg': {
          fontSize: '1.25rem'
        },
        '& *': {
          color: 'inherit !important'
        },
        '&.MuiInputAdornment-positionEnd:has(.MuiIconButton-root)': {
          '.MuiIconButton-root': {
            marginInlineEnd: -8
          }
        }
      },
      positionStart: ({ theme }) => ({
        marginInlineEnd: theme.spacing(2.5)
      }),
      positionEnd: ({ theme }) => ({
        marginInlineStart: theme.spacing(2.5)
      })
    }
  },
  MuiFormHelperText: {
    styleOverrides: {
      root: ({ theme }) => ({
        lineHeight: 1,
        letterSpacing: 'unset',
        marginBlockStart: theme.spacing(1),
        marginInline: theme.spacing(4)
      })
    }
  }
}

export default input
