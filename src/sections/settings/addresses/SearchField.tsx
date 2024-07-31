import OutlinedInput from '@mui/material/OutlinedInput';
import type { OutlinedInputProps } from '@mui/material/OutlinedInput/OutlinedInput';

import InputAdornment from '@mui/material/InputAdornment';
import { SearchIcon } from '@/assets/icons';

const SearchField = (props: OutlinedInputProps) => {
  return (
    <OutlinedInput
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon width={'24px'} height={'24px'} />
        </InputAdornment>
      }
      {...props}
    />
  );
};

export default SearchField;
