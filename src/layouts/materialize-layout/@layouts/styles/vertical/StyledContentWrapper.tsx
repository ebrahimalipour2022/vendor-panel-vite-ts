// Third-party Imports
import styled from '@emotion/styled';

// Util Imports
import {
  commonLayoutClasses,
  verticalLayoutClasses,
} from '@/layouts/materialize-layout/@layouts/utils/layoutClasses';
import themeConfig from '@/layouts/materialize-layout/configs/themeConfig';

const StyledContentWrapper = styled.div`
  &:has(.${verticalLayoutClasses.content}>.${commonLayoutClasses.contentHeightFixed}) {
    max-block-size: calc(100dvh - (2 * ${themeConfig.rootLayoutPadding}px));
    //max-block-size: 100dvh;
  }
`;

export default StyledContentWrapper;
