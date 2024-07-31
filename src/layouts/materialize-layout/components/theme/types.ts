// @ts-ignore

/*
 ! This file is for adding custom types to the MUI theme, components and props.
 ! Please do not remove anything from this file as it may break the application.
 ! You can add your own custom types to the MUI theme, components and props in this file
 ! but you must be aware about the MUI theme structure along with MUI CSS Variables.
 ! MUI Theme: https://mui.com/material-ui/customization/default-theme/
 ! MUI CSS Variables: https://mui.com/material-ui/experimental-api/css-theme-variables/overview/
 */

// MUI Imports
import type { ComponentsOverrides } from '@mui/material/styles';
import {
  CustomInputHorizontalProps,
  CustomInputImgProps,
  CustomInputVerticalProps,
} from '@/layouts/materialize-layout/@core/components/custom-inputs/types';

declare module '@mui/material/styles' {
  // eslint-disable-next-line lines-around-comment
  // Theme
  interface Theme {
    shape: {
      borderRadius: number;
      customBorderRadius: {
        xs: number;
        sm: number;
        md: number;
        lg: number;
        xl: number;
      };
    };
    customShadows: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    mainColorChannels: {
      light: string;
      dark: string;
      lightShadow: string;
      darkShadow: string;
      surface0: string;
      surface1: string;
      surface2: string;
      surface3: string;
      surface4: string;
      surface5: string;
    };
  }
  interface ThemeOptions {
    shape?: {
      borderRadius?: number;
      customBorderRadius?: {
        xs?: number;
        sm?: number;
        md?: number;
        lg?: number;
        xl?: number;
      };
    };
    customShadows?: {
      xs?: string;
      sm?: string;
      md?: string;
      lg?: string;
      xl?: string;
    };
    mainColorChannels?: {
      light?: string;
      dark?: string;
      lightShadow?: string;
      darkShadow?: string;
    };
  }

  // Palette Color
  interface PaletteColor {
    lightestOpacity?: string;
    lighterOpacity?: string;
    lightOpacity?: string;
    mainOpacity?: string;
    darkOpacity?: string;
    darkerOpacity?: string;
    darkestOpacity?: string;
  }
  interface SimplePaletteColorOptions {
    lighterOpacity?: string;
    lightOpacity?: string;
    mainOpacity?: string;
    darkOpacity?: string;
    darkerOpacity?: string;
  }

  // Palette
  interface Palette {
    //@ts-ignore
    background: {
      default: string;
      paper: string;
      defaultChannel: string;
      paperChannel: string;
    };
    customColors: {
      bodyBg: string;
      chatBg: string;
      greyLightBg: string;
      inputBorder: string;
      tableHeaderBg: string;
      tooltipText: string;
      trackBg: string;
      menuItemColor: string;
    };
  }
  interface PaletteOptions {
    //@ts-ignore
    background?: {
      default?: string;
      paper?: string;
      defaultChannel?: string;
      paperChannel?: string;
    };
    customColors?: {
      bodyBg?: string;
      chatBg?: string;
      greyLightBg?: string;
      inputBorder?: string;
      tableHeaderBg?: string;
      tooltipText?: string;
      trackBg?: string;
    };
  }
  interface PalettePaperChannel {
    paperChannel: string;
  }
  interface TypeBackground extends PalettePaperChannel {}

  // Components
  interface ComponentNameToClassKey {
    MuiCustomInputHorizontal: 'root' | 'title' | 'meta' | 'content' | 'input';
    MuiCustomInputVertical: 'root' | 'title' | 'content' | 'input';
    MuiCustomImage: 'root' | 'image' | 'input';
  }

  interface ComponentsPropsList {
    MuiCustomInputHorizontal: CustomInputHorizontalProps;
    MuiCustomInputVertical: CustomInputVerticalProps;
    MuiCustomImage: CustomInputImgProps;
  }

  interface Components {
    MuiCustomInputHorizontal?: {
      defaultProps?: ComponentsPropsList['MuiCustomInputHorizontal'];
      styleOverrides?: ComponentsOverrides<Theme>['MuiCustomInputHorizontal'];
    };
    MuiCustomInputVertical?: {
      defaultProps?: ComponentsPropsList['MuiCustomInputVertical'];
      styleOverrides?: ComponentsOverrides<Theme>['MuiCustomInputVertical'];
    };
    MuiCustomImage?: {
      defaultProps?: ComponentsPropsList['MuiCustomImage'];
      styleOverrides?: ComponentsOverrides<Theme>['MuiCustomImage'];
    };
  }
}

declare module '@mui/material/Chip' {
  interface ChipPropsVariantOverrides {
    tonal: true;
  }
}

declare module '@mui/material/Pagination' {
  interface PaginationPropsVariantOverrides {
    tonal: true;
  }
}
// @ts-ignore
declare module '@mui/lab/TimelineDot' {
  interface TimelineDotPropsVariantOverrides {
    tonal: true;
  }
}
