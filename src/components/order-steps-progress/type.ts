export type StepStatus = 'todo' | 'active' | 'done' | 'pending' | 'rejected';

export type ProgressType = 'successfully' | 'returned' | 'canceled' | 'backAndForth';
export interface IStepTitle {
  main?: string; // this is main text
  todo?: string;
  active?: string;
  done?: string;
  pending?: string;
  rejected?: string;
}
export interface IStep {
  title?: IStepTitle;
  subtitle?: string;
  status?: StepStatus;
  name?: string;
}
