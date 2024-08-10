import { ProgressType, IStep } from '@/components/order-steps-progress/type';

export const steps: { [key: string]: IStep } = {
  status1: {
    title: {
      main: 'ثبت سفارش',
      done: 'ثبت سفارش',
    },
    subtitle: '14:12',
    status: 'done',
  },
  status2: {
    title: {
      main: 'در جستجوی سفیر',
      done: 'سفیر پیدا شد',
    },
    subtitle: '14:12',
    status: 'done',
  },
  status3: {
    title: {
      main: 'سفیر در راه مبدا',
      done: 'سفیر در مبدا',
    },
    subtitle: '14:12',
    status: 'done',
  },
  status4: {
    title: {
      main: 'در حال جمع‌آوری',
      done: 'تحویل سفیر شد',
    },
    subtitle: '14:12',
    status: 'done',
  },
  status5: {
    title: {
      main: 'سفیر در راه مقصد',
      done: 'سفیر در مقصد',
    },
    status: 'active',
  },
  status6: {
    title: {
      main: 'تحویل شد',
      done: 'تحویل شد',
      rejected: 'لغو شد',
    },
    status: 'rejected',
  },
  status7: {
    title: {
      main: 'سفیر در حال بازگشت',
      done: 'سفیر در مبدا',
    },
    status: 'rejected',
  },
  status8: {
    title: {
      main: 'درخواست مرجوعی',
      done: 'درخواست مرجوعی',
    },
    status: 'pending',
  },
  status9: {
    title: {
      main: 'سفیر در راه بازگشت',
      done: 'سفیر بازگشت',
    },
    status: 'todo',
  },
  status10: {
    title: {
      main: 'اتمام سفر',
      done: 'اتمام سفر',
    },
    status: 'todo',
  },
  status11: {
    title: {
      rejected: 'لغو سفر',
    },
    status: 'rejected',
  },
};

export const progressStep: Record<ProgressType, IStep[]> = {
  successfully: [
    steps.status1,
    steps.status2,
    steps.status3,
    steps.status4,
    steps.status5,
    steps.status6,
  ],
  returned: [
    steps.status1,
    steps.status2,
    steps.status3,
    steps.status4,
    steps.status5,
    steps.status8,
    steps.status9,
    steps.status6,
  ],
  canceled: [steps.status1, steps.status2, steps.status11],
  backAndForth: [
    steps.status1,
    steps.status2,
    steps.status3,
    steps.status4,
    steps.status5,
    steps.status6,
    steps.status7,
    steps.status10,
  ],
};
