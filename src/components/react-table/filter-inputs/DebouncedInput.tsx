import TextField, { TextFieldProps } from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { SearchIcon } from '@/assets/icons';
import InputAdornment from '@mui/material/InputAdornment';
import { useSearchParams } from 'react-router-dom';

const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & TextFieldProps) => {
  // States
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <TextField
      {...props}
      variant={'outlined'}
      size="small"
      value={value}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon width={'20px'} height={'20px'} />
          </InputAdornment>
        ),
      }}
      onChange={(e) => setValue(e.target.value)}
      className={'bg-white'}
    />
  );
};
export default DebouncedInput;
