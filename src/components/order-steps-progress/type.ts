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
