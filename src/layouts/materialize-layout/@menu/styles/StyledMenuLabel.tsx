// Third-party Imports
import styled from '@emotion/styled'

// Type Imports
import type { Theme } from '@mui/material/styles'

import type { RootStylesType } from '../types'

type StyledMenuLabelProps = RootStylesType & {
  textTruncate?: boolean
  theme?: Theme
}

const StyledMenuLabel = styled.span<StyledMenuLabelProps>`
  flex-grow: 1;
  ${({ textTruncate, theme }) =>
    textTruncate &&
    `
      font-size:${theme.typography.body2.fontSize};
      font-weight:${theme.typography.fontWeightMedium};
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    `};
  ${({ rootStyles }) => rootStyles};
`

export default StyledMenuLabel
