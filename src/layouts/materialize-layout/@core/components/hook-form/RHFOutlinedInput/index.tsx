import type { ReactNode } from 'react'
import { forwardRef } from 'react'

import { FormHelperText, OutlinedInput, Stack } from '@mui/material'

import type { OutlinedInputProps } from '@mui/material/OutlinedInput/OutlinedInput'
import FormLabel from '@mui/material/FormLabel'

const RHFOutlinedInput = forwardRef((props: OutlinedInputProps & { helperText?: ReactNode }, ref: any) => {
  const { name = '', placeholder, error, helperText, label, required, ...rest } = props

  return (
    <Stack spacing={1.7}>
      {label && (
        <FormLabel required={required} error={error} htmlFor={name}>
          {label}
        </FormLabel>
      )}
      <OutlinedInput
        ref={ref}
        name={name}
        placeholder={placeholder}
        fullWidth
        {...(error && {
          error: true
        })}
        {...rest}
      />
      {error && helperText && (
        <FormHelperText error id={name}>
          {helperText}
        </FormHelperText>
      )}
    </Stack>
  )
})

export default RHFOutlinedInput
