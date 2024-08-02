import { lazy } from 'react';
// auth
// layouts
import AuthClassicLayout from '@/layouts/auth/classic';

// ----------------------------------------------------------------------

// JWT
const JwtLoginPage = lazy(() => import('@/pages/auth/login'));

// ----------------------------------------------------------------------

export const authRoutes = [
  {
    path: 'login',
    element: (
      <AuthClassicLayout>
        <JwtLoginPage />
      </AuthClassicLayout>
    ),
  },
];

// const authJwt = {
//   path: 'jwt',
//   element: (
//     <GuestGuard>
//       <Outlet />
//     </GuestGuard>
//   ),
//   children: [
//     {
//       path: 'login',
//       element: (
//         <AuthClassicLayout>
//           <JwtLoginPage />
//         </AuthClassicLayout>
//       ),
//     },
//   ],
// };
//
// export const authRoutes = [
//   {
//     path: 'auth',
//     children: [authJwt],
//   },
// ];
