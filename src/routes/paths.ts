// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  // AUTH
  auth: {
    login: `/login`,
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    one: `${ROOTS.DASHBOARD}/orders`,
    two: `${ROOTS.DASHBOARD}/reports`,
    three: `${ROOTS.DASHBOARD}/transactions`,
    settings: {
      orderAddress: `${ROOTS.DASHBOARD}/order-address`,
    },
  },
};
