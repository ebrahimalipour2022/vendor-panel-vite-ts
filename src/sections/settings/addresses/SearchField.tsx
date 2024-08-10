import OutlinedInput from '@mui/material/OutlinedInput';
import type { OutlinedInputProps } from '@mui/material/OutlinedInput/OutlinedInput';

import InputAdornment from '@mui/material/InputAdornment';
import { SearchIcon } from '@/assets/icons';
import { useEffect, useState } from 'react';
import type { ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';

const AddressSearchField = (props: OutlinedInputProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState<string | null>(searchParams.get('query') ?? '');
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event?.target?.value;
    setValue(value || null);
    searchParams.set('query', value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchParams(searchParams);
    }, 700);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <OutlinedInput
      onChange={onChange}
      defaultValue={value}
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon width={'24px'} height={'24px'} />
        </InputAdornment>
      }
      {...props}
    />
  );
};

export default AddressSearchField;
