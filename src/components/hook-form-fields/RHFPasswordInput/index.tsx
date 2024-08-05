import type { ReactNode } from 'react';
import { forwardRef, useState } from 'react';

import { IconButton, InputAdornment } from '@mui/material';

// form
import Stack from '@mui/material/Stack';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import type { OutlinedInputProps } from '@mui/material/OutlinedInput/OutlinedInput';

const RHFPasswordField = forwardRef(
  (props: OutlinedInputProps & { helperText?: ReactNode }, ref: any) => {
    const { name = '', placeholder, error, helperText, label, required, ...rest } = props;
    const [isPasswordShown, setIsPasswordShown] = useState(false);

    const handleClickShowPassword = () => setIsPasswordShown((show) => !show);

    return (
      <Stack spacing={1.7}>
        {label && (
          <FormLabel required={required} error={error}>
            {label}
          </FormLabel>
        )}
        <OutlinedInput
          ref={ref}
          fullWidth
          name={name}
          type={isPasswordShown ? 'text' : 'password'}
          placeholder={placeholder ?? '********'}
          inputProps={{
            maxLength: 30,
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                edge="end"
                onClick={handleClickShowPassword}
                onMouseDown={(e) => e.preventDefault()}
                aria-label={`toggle ${name} visibility`}
              >
                <i className={isPasswordShown ? 'ri-eye-off-line' : 'ri-eye-line'} />
              </IconButton>
            </InputAdornment>
          }
          {...(error && {
            error: true,
          })}
          {...rest}
        />
        {error && helperText && <FormHelperText error>{helperText}</FormHelperText>}
      </Stack>
    );
  }
);

export default RHFPasswordField;
