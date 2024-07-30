import type { ReactNode } from 'react'

import { OutlinedInput, Stack, InputLabel, FormHelperText } from '@mui/material'

import type { OutlinedInputProps } from '@mui/material/OutlinedInput/OutlinedInput'

const RHFOutlinedInput = ({
  name,
  placeholder,
  error,
  helperText,
  label,
  required,
  inputProps,
  ...rest
}: OutlinedInputProps & { helperText?: ReactNode }) => {
  return (
    <Stack spacing={2}>
      <InputLabel shrink={false} htmlFor={name}>
        {label || ''}
      </InputLabel>
      <OutlinedInput
        fullWidth
        required={required}
        type={'text'}
        placeholder={placeholder}
        inputProps={{
          ...inputProps,
          maxLength: 50
        }}
        error={!!error}
        {...rest}
      />
      <FormHelperText error={error} id={name}>
        {helperText}
      </FormHelperText>
    </Stack>
  )
}

export default RHFOutlinedInput
