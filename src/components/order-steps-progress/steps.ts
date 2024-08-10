import { ProgressStep, ProgressType, Step } from '@/components/order-steps-progress/type';

export const steps: { [key: string]: Step } = {
  status1: {
    title: {
      main: 'ثبت سفارش',
    },
    status: 'done',
  },
  status2: {
    title: {
      main: 'در جستجوی سفیر',
      done: 'سفیر پیدا شد',
    },
    status: 'done',
  },
  status3: {
    title: {
      main: 'سفیر در راه مبدا',
      done: 'سفیر در مبدا',
    },
    status: 'done',
  },
  status4: {
    title: {
      main: 'در حال جمع‌آوری',
      done: 'تحویل سفیر شد',
    },
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
    },
    status: 'todo',
  },
  status7: {
    title: {
      main: 'سفیر در حال بازگشت',
      active: 'سفیر در حال بازگشت',
      done: 'سفیر در مبدا',
    },
    status: 'todo',
  },
  status8: {
    title: {
      main: 'درخواست مرجوعی',
    },
    status: 'todo',
  },
  status9: {
    title: {
      main: 'سفیر در راه بازگشت',
      active: 'سفیر در راه بازگشت',
      done: 'سفیر بازگشت',
    },
    status: 'todo',
  },
  status10: {
    title: {
      main: 'اتمام سفر',
    },
    status: 'todo',
  },
};

export const progressStep: Record<ProgressType, Step[]> = {
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
  canceled: [steps.status1, steps.status2, steps.status6],
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
