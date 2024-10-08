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
    orders: `${ROOTS.DASHBOARD}/orders`,
    reports: `${ROOTS.DASHBOARD}/reports`,
    transactions: `${ROOTS.DASHBOARD}/transactions`,
    wallet: `${ROOTS.DASHBOARD}/wallet`,
    settings: {
      orderAddress: `${ROOTS.DASHBOARD}/order-address`,
    },
  },
};
