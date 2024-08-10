// DeliveryProgress.tsx

import React from 'react';
import { Step, StepLabel, Stepper } from '@mui/material';
import { progressStep } from '@/components/order-steps-progress/steps';
import { StepStatus } from '@/components/order-steps-progress/type';

export const statusColors: Record<StepStatus, string> = {
  todo: 'var(--mui-palette-grey-400)',
  active: 'var(--mui-palette-primary-main)',
  done: 'var(--mui-palette-success-main)',
  pending: 'var(--mui-palette-warning-main)',
  reject: 'var(--mui-palette-error-main)',
};

const DeliveryProgress = () => {
  const steps = progressStep.successfully;
  return (
    <div className="w-full p-4">
      <Stepper
        alternativeLabel
        activeStep={steps.findIndex((step) => step?.status === 'active')}
        className="mb-4"
      >
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel
              classes={{
                root: statusColors[step?.status!],
                active: 'text-blue-600',
                completed: 'text-green-600',
              }}
            >
              <div>
                <div className={`${statusColors[step?.status!]} font-bold`}>{step.title?.main}</div>
                <div className={`${statusColors[step?.status!]} text-sm`}>{step.subtitle}</div>
              </div>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default DeliveryProgress;
