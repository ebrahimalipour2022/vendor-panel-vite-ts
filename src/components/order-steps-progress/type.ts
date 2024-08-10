export type StepStatus = 'todo' | 'active' | 'done' | 'pending' | 'reject';

export type ProgressType = 'successfully' | 'returned' | 'canceled' | 'backAndForth';

export interface Step {
  title?: {
    main?: string; // this is main text
    todo?: string;
    active?: string;
    done?: string;
    pending?: string;
    rejected?: string;
  };
  subtitle?: string;
  status?: StepStatus;
}

export interface ProgressStep {
  type: ProgressType;
  steps: Step[];
}

const StepStatusColor = {
  todo: 'var(--mui-palette-grey-400)',
  active: 'var(--mui-palette-primary-main)',
  done: 'var(--mui-palette-success-main)',
  pending: 'var(--mui-palette-warning-main)',
  reject: 'var(--mui-palette-error-main)',
};
