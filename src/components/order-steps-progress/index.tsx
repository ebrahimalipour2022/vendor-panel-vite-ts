import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';
import { ActiveIcon, DoneIcon, TodoIcon, RejectIcon } from '@/assets/icons';
import { IStep, IStepTitle, StepStatus } from '@/components/order-steps-progress/type';
import Typography from '@mui/material/Typography';

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 12px)',
    right: 'calc(50% + 12px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.success.main,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.success.main,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.action.active,
    borderTopWidth: 2,
    borderRadius: 1,
  },
}));
const MuiStepLabel = styled(StepLabel)(({ theme }) => ({
  [`& .MuiStepLabel-label`]: {
    marginTop: '5px !important',
  },
}));
const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(
  ({ theme, ownerState }) => ({
    color: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.action.active,
    display: 'flex',
    height: 22,
    alignItems: 'center',
    '& .QontoStepIcon-completedIcon': {
      zIndex: 1,
    },
    '& .QontoStepIcon-circle': {
      width: 8,
      height: 8,
      borderRadius: '50%',
      backgroundColor: 'currentColor',
    },
  })
);

function QontoStepIcon(props: StepIconProps) {
  console.log('QontoStepIcon props :', props);
  const { active, completed, error, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? <DoneIcon /> : active ? <ActiveIcon /> : error ? <RejectIcon /> : <TodoIcon />}
    </QontoStepIconRoot>
  );
}

export const statusColors: Record<StepStatus, string> = {
  todo: 'var(--mui-palette-grey-400)',
  active: 'var(--mui-palette-primary-main)',
  done: 'var(--mui-palette-success-main)',
  pending: 'var(--mui-palette-warning-main)',
  rejected: 'var(--mui-palette-error-main)',
};

function CustomizedSteppers({ steps }: { steps: IStep[] }) {
  // const steps = progressStep.successfully;
  const getActiveStep = (): number => {
    return steps.findIndex(
      (item, idx) =>
        item.status === 'active' || item.status === 'rejected' || item.status === 'pending'
    );
  };
  const getStepColor = (status: StepStatus) => {
    if (status) {
      return statusColors[status];
    }
    return statusColors.active;
  };
  const getTitle = (item: IStepTitle, status: StepStatus) => {
    switch (status) {
      case 'done':
        return item.done;
      case 'rejected':
        return item.rejected;
      default:
        return item.main;
    }
  };
  return (
    <Stack sx={{ width: '100%' }} spacing={4}>
      <Stepper alternativeLabel activeStep={getActiveStep()} connector={<QontoConnector />}>
        {steps.map((item, index) => (
          <Step key={index}>
            <MuiStepLabel StepIconComponent={QontoStepIcon}>
              <div className={'flex flex-col items-center justify-center'}>
                <Typography
                  variant={'caption'}
                  component={'div'}
                  fontWeight={'600'}
                  color={getStepColor(item?.status!)}
                >
                  {getTitle(item?.title!, item?.status!)}
                </Typography>
                {item.subtitle && (
                  <Typography
                    variant={'caption'}
                    component={'div'}
                    fontWeight={'600'}
                    color={getStepColor(item?.status!)}
                  >
                    {item.subtitle}
                  </Typography>
                )}
              </div>
            </MuiStepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
}

export default CustomizedSteppers;
