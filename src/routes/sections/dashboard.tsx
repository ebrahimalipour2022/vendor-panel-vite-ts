import { Suspense, lazy } from 'react';
import { Outlet } from 'react-router-dom';
// auth
import { AuthGuard } from 'src/auth/guard';
// layouts
// components
import { LoadingScreen, SplashScreen } from 'src/components/loading-screen';
import DashboardLayout from '@/layouts/dashboard/dashboard';

// ----------------------------------------------------------------------

const IndexPage = lazy(() => import('src/pages/dashboard/home'));
const Orders = lazy(() => import('src/pages/dashboard/orders'));
const Reports = lazy(() => import('src/pages/dashboard/reports'));
const Transactions = lazy(() => import('src/pages/dashboard/transactions'));
const OrderAddress = lazy(() => import('src/pages/dashboard/settings/order-address'));
// const PageTwo = lazy(() => import('src/pages/dashboard/two'));
// const PageThree = lazy(() => import('src/pages/dashboard/three'));
// const PageFour = lazy(() => import('src/pages/dashboard/four'));
// const PageFive = lazy(() => import('src/pages/dashboard/five'));
// const PageSix = lazy(() => import('src/pages/dashboard/six'));

// ----------------------------------------------------------------------

export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Suspense
            fallback={
              <div className={'absolute inset-0'}>
                <LoadingScreen />
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [
      { element: <IndexPage />, index: true },
      { path: 'order-address', element: <OrderAddress /> },
      { path: 'orders', element: <Orders /> },
      { path: 'reports', element: <Reports /> },
      { path: 'transactions', element: <Transactions /> },
    ],
  },
];
