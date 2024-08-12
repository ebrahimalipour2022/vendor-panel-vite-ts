import type { JSX, ReactNode } from 'react';
import { forwardRef, useState } from 'react';
import classnames from 'classnames';
import type { StylesConfig } from 'react-select';
import Select, { components } from 'react-select';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import OutlinedInput from '@mui/material/OutlinedInput';
import type { BoxProps } from '@mui/material/Box/Box';
import InputAdornment from '@mui/material/InputAdornment';
import type { OutlinedInputProps } from '@mui/material/OutlinedInput/OutlinedInput';
import type { StateOption } from '@/types/select-field';
import FormLabel from '@mui/material/FormLabel';
import Stack from '@mui/material/Stack';
import { CircularProgress, SxProps } from '@mui/material';
import { SearchIcon } from '@/assets/icons';
import { Theme } from '@mui/material/styles';

const selectStyles: StylesConfig<StateOption, false> = {
  // @ts-ignore
  control: (provided) => ({
    ...provided,
    // minWidth: 240,
    // minWidth: '100%',
    margin: 8,
    flexDirection: 'row-reverse',
  }),
  // @ts-ignore
  placeholder: (props) => ({
    ...props,
    fontSize: '0.75rem',
  }),
  // @ts-ignore
  input: (props) => ({
    ...props,
    fontSize: '0.875rem',
  }),
  menu: () => ({ boxShadow: 'inset 0 1px 0 rgba(0, 0, 0, 0.1)' }),
  // input: (base, props) => ({
  // }),
};

type Props = {
  name?: string;
  value?: StateOption | StateOption[];
  label?: string;
  options: StateOption[];
  allOptionText?: string;
  placeholder?: string;
  searchText?: string;
  isLoading?: boolean;
  required?: boolean;
  isDisable?: boolean;
  isMulti?: boolean;
  error?: boolean;
  defaultValue?: StateOption[];
  handleChange?: (value: StateOption | StateOption[]) => void;
  outlinedProps?: OutlinedInputProps;
  outlinedSx?: SxProps<Theme>;
  size?: 'small' | 'medium';
};

const RHFReactSelectField = forwardRef((props: Props & { helperText?: ReactNode }, ref: any) => {
  const {
    name,
    label,
    value,
    error,
    options,
    placeholder = 'انتخاب نمایید...',
    searchText = 'جستجو در گزینه ها...',
    isMulti,
    isDisable,
    required,
    isLoading = true,
    size,
    allOptionText,
    handleChange,
    defaultValue,
    outlinedProps,
    outlinedSx,
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const disabled = isDisable || isLoading;
  // const {} = useStateManager();
  return (
    <Dropdown
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      size={size || 'medium'}
      target={
        <Stack spacing={1.7}>
          {label && (
            <FormLabel required={required} error={error} disabled={disabled}>
              {label}
            </FormLabel>
          )}
          <OutlinedInput
            ref={ref}
            name={name}
            disabled={disabled}
            size={size || 'medium'}
            endAdornment={
              isOpen ? (
                <InputAdornment position="end">
                  <ChevronDown />
                </InputAdornment>
              ) : (
                <InputAdornment position="end">
                  {isLoading ? <CircularProgress size={20} color={'secondary'} /> : <ChevronUp />}
                </InputAdornment>
              )
            }
            onClick={() => !disabled && setIsOpen((prev) => !prev)}
            value={
              isMulti
                ? getJoinedOptions({ value, options, allOptionText })
                : value && 'label' in value && value?.label
                ? value.label
                : ''
            }
            placeholder={placeholder}
            sx={{
              input: {
                overflow: 'hidden !important',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              },
              ...outlinedSx,
            }}
            {...(error && {
              error: true,
            })}
            {...outlinedProps}
          />
        </Stack>
      }
    >
      <Select
        // @ts-ignore
        isMulti={isMulti}
        autoFocus
        isLoading={isLoading}
        isDisabled={disabled}
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        backspaceRemovesValue={false}
        components={{ Option, DropdownIndicator, IndicatorSeparator: null }}
        controlShouldRenderValue={false}
        isClearable={false}
        menuIsOpen
        // @ts-ignore
        onChange={(newValue: StateOption[]) => {
          // @ts-ignore
          handleChange(newValue);
          if (!isMulti) {
            setIsOpen(false);
          }
        }}
        options={options}
        defaultValue={defaultValue}
        placeholder={searchText}
        styles={selectStyles}
        tabSelectsValue={false}
        value={value}
      />
    </Dropdown>
  );
});

export default RHFReactSelectField;

//========================================================================

const Menu = (props: BoxProps) => {
  const shadow = 'hsla(218, 50%, 10%, 0.1)';

  return (
    <Box
      sx={{
        backgroundColor: 'white',
        borderRadius: 1,
        boxShadow: `0 0 0 1px ${shadow}, 0 4px 11px ${shadow}`,
        marginTop: 0,
        marginLeft: '0.04rem',
        position: 'absolute',
        minWidth: '100%',
        zIndex: 2,
      }}
      {...props}
    />
  );
};
const Blanket = (props: JSX.IntrinsicElements['div']) => (
  <div className={'fixed inset-0  z-[1] '} {...props} />
);
const Dropdown = ({
  children,
  isOpen,
  target,
  onClose,
  size,
}: {
  children?: ReactNode;
  readonly isOpen: boolean;
  readonly target: ReactNode;
  readonly onClose: () => void;
  size?: 'small' | 'medium';
}) => (
  <Box
    sx={{
      position: 'relative',
      '& .option-item-class': {
        padding: size === 'small' ? '3px' : '6px',
      },
    }}
  >
    {target}
    {isOpen ? <Menu>{children}</Menu> : null}
    {isOpen ? <Blanket onClick={onClose} /> : null}
  </Box>
);
const Svg = (p: JSX.IntrinsicElements['svg']) => (
  <svg width="24" height="24" viewBox="0 0 24 24" focusable="false" role="presentation" {...p} />
);
const DropdownIndicator = () => (
  <div className={'h-[1.5rem] w-[1.5rem] px-1 text-textPrimary'}>
    <SearchIcon width={'1.5rem'} height={'1.5rem'} />
  </div>
);
const ChevronDown = () => (
  <Svg style={{ marginRight: -6 }}>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M11.6998 11.0999L15.5998 14.9999C15.7832 15.1832 16.0165 15.2749 16.2998 15.2749C16.5832 15.2749 16.8165 15.1832 16.9998 14.9999C17.1832 14.8165 17.2748 14.5832 17.2748 14.2999C17.2748 14.0165 17.1832 13.7832 16.9998 13.5999L12.3998 8.99985C12.2998 8.89985 12.1915 8.82902 12.0748 8.78735C11.9582 8.74569 11.8332 8.72485 11.6998 8.72485C11.5665 8.72485 11.4415 8.74569 11.3248 8.78735C11.2082 8.82902 11.0998 8.89985 10.9998 8.99985L6.39982 13.5999C6.21648 13.7832 6.12482 14.0165 6.12482 14.2999C6.12482 14.5832 6.21648 14.8165 6.39982 14.9999C6.58315 15.1832 6.81648 15.2749 7.09982 15.2749C7.38315 15.2749 7.61648 15.1832 7.79982 14.9999L11.6998 11.0999Z"
        fill="#68686B"
      />
    </svg>
  </Svg>
);
const ChevronUp = () => (
  <Svg style={{ marginRight: -6 }}>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M11.6998 12.9001L15.5998 9.00015C15.7831 8.81681 16.0164 8.72515 16.2998 8.72515C16.5831 8.72515 16.8164 8.81681 16.9998 9.00015C17.1831 9.18348 17.2748 9.41681 17.2748 9.70015C17.2748 9.98348 17.1831 10.2168 16.9998 10.4001L12.3998 15.0001C12.2998 15.1001 12.1914 15.171 12.0748 15.2126C11.9581 15.2543 11.8331 15.2751 11.6998 15.2751C11.5664 15.2751 11.4414 15.2543 11.3248 15.2126C11.2081 15.171 11.0998 15.1001 10.9998 15.0001L6.39976 10.4001C6.21642 10.2168 6.12476 9.98348 6.12476 9.70015C6.12476 9.41681 6.21642 9.18348 6.39976 9.00015C6.58309 8.81681 6.81642 8.72515 7.09976 8.72515C7.38309 8.72515 7.61642 8.81681 7.79976 9.00015L11.6998 12.9001Z"
        fill="#68686B"
      />
    </svg>
  </Svg>
);
const Option = (props: any) => {
  // const { data, options } = props
  const isLastOption = props?.data?.value === props?.options[props?.options?.length - 1]?.value;

  return (
    <div>
      <components.Option
        {...props}
        className={classnames(
          'option-item-class cursor-pointer bg-transparent px-1 hover:bg-[var(--mui-palette-action-hover)]',
          {
            'border-b border-[var(--mui-palette-divider)]': !isLastOption,
          }
        )}
      >
        <div className={'[&>input]:bg-white'}>
          <Checkbox checked={props.isSelected} />
          {/*<input type='checkbox' checked={props.isSelected} onChange={() => null} />{' '}*/}
          <label className={'cursor-pointer text-textPrimary font-bold text-[0.875rem]'}>
            {props.label}
          </label>
        </div>
      </components.Option>
    </div>
  );
};

const getJoinedOptions = ({
  value,
  options,
  allOptionText,
}: {
  value?: StateOption | StateOption[];
  options: StateOption[];
  allOptionText?: string;
}) => {
  if (value && Array.isArray(value)) {
    const isAllSelected = options?.length === value?.length;

    if (isAllSelected) {
      return allOptionText || 'همه موارد';
    }

    return value.map((item) => item.label).join(',');
  }

  return '';
};
