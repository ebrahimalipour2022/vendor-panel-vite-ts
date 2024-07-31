// React Imports
import type { ReactNode } from 'react';

// Next Imports

// MUI Imports
import type { IconButtonProps } from '@mui/material/IconButton';
import type { MenuItemProps } from '@mui/material/MenuItem';
import type { DividerProps } from '@mui/material/Divider';
import type { BoxProps } from '@mui/material/Box';

export type OptionDividerType = {
  divider: boolean;
  dividerProps?: DividerProps;
  href?: never;
  icon?: never;
  text?: never;
  linkProps?: never;
  menuItemProps?: never;
};
export type OptionMenuItemType = {
  text: ReactNode;
  icon?: ReactNode;
  linkProps?: BoxProps;
  href?: string;
  menuItemProps?: MenuItemProps;
  divider?: never;
  dividerProps?: never;
};

export type OptionType = string | OptionDividerType | OptionMenuItemType;

export type OptionsMenuType = {
  icon?: ReactNode;
  iconClassName?: string;
  options: OptionType[];
  leftAlignMenu?: boolean;
  iconButtonProps?: IconButtonProps;
};
