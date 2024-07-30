import { styled } from '@mui/material/styles'

const PasswordFieldWrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '100%',
  '& .MuiInputBase-input': {
    // fontFamily: 'sans-serif !important',
    direction: theme.direction === 'rtl' ? 'ltr !important' : 'initial',
    textAlign: theme.direction === 'rtl' ? 'left !important' : 'initial'
  }
}))

export default PasswordFieldWrapper
