// Third-party Imports
import styled from '@emotion/styled';

// Config Imports
import themeConfig from '@/layouts/materialize-layout/configs/themeConfig';

// Util Imports
import { commonLayoutClasses } from '@/layouts/materialize-layout/@layouts/utils/layoutClasses';
import { defaultBreakpoints } from '@/layouts/materialize-layout/@menu/defaultConfigs';

type StyledMainProps = {
  isContentCompact: boolean;
};

const StyledMain = styled.main<StyledMainProps>`
  padding: ${themeConfig.layoutPadding}px;
  ${({ isContentCompact }) =>
    isContentCompact &&
    `
    margin-inline: auto;
    max-inline-size: ${themeConfig.compactContentWidth}px;
  `}

  &:has(.${commonLayoutClasses.contentHeightFixed}) {
    display: flex;
    overflow: hidden;
  }
  @media (max-width: ${defaultBreakpoints.md}) {
    padding: ${themeConfig.layoutPadding}px 0;
  }
`;

export default StyledMain;
