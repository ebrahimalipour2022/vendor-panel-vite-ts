// MUI Imports
import Button from '@mui/material/Button';

// Type Imports
// import { getLocale } from 'next-intl/server';
import type { ChildrenType } from '@/layouts/materialize-layout/@core/types';

// Layout Imports
import LayoutWrapper from '@/layouts/materialize-layout/@layouts/LayoutWrapper';
import VerticalLayout from '@/layouts/materialize-layout/@layouts/VerticalLayout';

// Component Imports
import Navigation from '@/layouts/materialize-layout/components/layout/vertical/Navigation';
import Navbar from '@/layouts/materialize-layout/components/layout/vertical/Navbar';
import Customizer from '@/layouts/materialize-layout/@core/components/customizer';
import ScrollToTop from '@/layouts/materialize-layout/@core/components/scroll-to-top';

// Util Imports
import { getMode, getSystemMode } from '@/layouts/materialize-layout/@core/utils/serverHelpers';
import ArrowUpIcon from '@/assets/icons/ArrowUp';
import { KeyboardArrowUpOutlined } from '@mui/icons-material';

const DashboardLayout = ({ children }: ChildrenType) => {
  // const locale = await getLocale();
  // const data = await umAPI.userInfoAxios()
  // const direction = locale === 'en' ? 'ltr' : 'rtl';
  const direction = 'rtl';
  // Vars
  const mode = getMode();
  const systemMode = getSystemMode();

  return (
    <div>
      <LayoutWrapper
        systemMode={systemMode}
        verticalLayout={
          <VerticalLayout
            navigation={<Navigation mode={mode} systemMode={systemMode} />}
            navbar={<Navbar />}
          >
            {children}
          </VerticalLayout>
        }
      />
      <ScrollToTop className="mui-fixed">
        <Button
          variant="contained"
          className="is-10 bs-10 rounded-full p-0 min-is-0 flex items-center justify-center"
        >
          <KeyboardArrowUpOutlined />
        </Button>
      </ScrollToTop>
      {/*<Customizer dir={direction} disableDirection />*/}
    </div>
  );
};

export default DashboardLayout;
