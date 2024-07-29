// eslint-disable-next-line import/no-extraneous-dependencies,import/no-import-module-exports
import plugin from 'tailwindcss/plugin';

module.exports = plugin(() => {}, {
  theme: {
    borderColor: ({ theme }) => ({
      ...theme('colors'),
      DEFAULT: 'var(--border-color, currentColor)',
    }),
    borderRadius: {
      none: '0px',
      xs: 'var(--mui-shape-customBorderRadius-xs)',
      sm: 'var(--mui-shape-customBorderRadius-sm)',
      DEFAULT: '0.375rem',
      md: 'var(--mui-shape-customBorderRadius-md)',
      lg: 'var(--mui-shape-customBorderRadius-lg)',
      xl: 'var(--mui-shape-customBorderRadius-xl)',
      '2xl': '0.75rem',
      '3xl': '1rem',
      '4xl': '1.5rem',
      full: '9999px',
    },
    screens: {
      sm: '600px',
      md: '900px',
      lg: '1200px',
      xl: '1536px',
      '2xl': '1920px',
    },
    extend: {
      boxShadow: {
        xs: 'var(--mui-customShadows-xs)',
        sm: 'var(--mui-customShadows-sm)',
        DEFAULT: 'var(--mui-customShadows-md)',
        md: 'var(--mui-customShadows-md)',
        lg: 'var(--mui-customShadows-lg)',
        xl: 'var(--mui-customShadows-xl)',
      },
      colors: {
        primary: 'rgba(18, 92, 204, 1)',
        primaryLight: 'rgba(22, 115, 255, 1)',
        primaryDark: 'rgba(17, 86, 191, 1)',
        secondary: '#68686B',
        error: 'rgba(242, 25, 74, 1)',
        errorLight: 'rgba(246, 101, 134, 1)',
        warning: 'rgba(252, 215, 123, 1)',
        info: '#26C6F9',
        success: 'rgba(19, 195, 156, 1)',
        successLight: 'rgba(97, 215, 189, 1)',
        textPrimary: '#141414',
        textSecondary: '#68686B',
        textDisabled: '#68686B',
        actionActive: '#E1E1E7',
        actionHover: '#E1E1E7',
        actionSelected: '#F7F7FE',
        actionFocus: '#E1E1E7',
        backgroundPaper: '#FFFFFF',
        backgroundDefault: '#F7F7FE',
        track: '#F5F5F8',
        backdrop: '#F7F7FE',
      },
      zIndex: {
        header: 'var(--header-z-index)',
        footer: 'var(--footer-z-index)',
        customizer: 'var(--customizer-z-index)',
        search: 'var(--search-z-index)',
        drawer: 'var(--drawer-z-index)',
      },
    },
  },
});
