import CustomDialog from '@/components/dialogs/custom-dialog';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import type { ButtonProps } from '@mui/material/Button/Button';
import type { LoadingButtonProps } from '@mui/lab/LoadingButton/LoadingButton';

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  title?: string;
  subTitle?: string;
  confirmBtnProps?: LoadingButtonProps;
  cancelBtnProps?: ButtonProps;
  onCancel?: () => void;
  onConfirm?: () => void;
};

const ConfirmDialog = (props: Props) => {
  const { open, setOpen, title, subTitle, onConfirm, onCancel, confirmBtnProps, cancelBtnProps } =
    props;
  const { t } = useTranslation();

  return (
    <CustomDialog
      open={open}
      setOpen={setOpen}
      title={''}
      maxWidth={'xs'}
      fullWidth={true}
      icon={null}
      scroll={false}
    >
      <div className={'flex flex-col gap-4'}>
        <div className={'flex flex-col gap-4 p-4'}>
          {title && (
            <Typography fontSize={'1.125rem'} fontWeight={'bold'} component="h3">
              {title}
            </Typography>
          )}
          {subTitle && (
            <Typography variant="body2" component="h5">
              {subTitle}
            </Typography>
          )}
        </div>
        <div className={'flex flex-row items-center gap-2'}>
          {onConfirm && <LoadingButton size={'large'} onClick={onConfirm} {...confirmBtnProps} />}
          {onCancel && <Button size={'large'} onClick={onCancel} {...cancelBtnProps} />}
        </div>
      </div>
    </CustomDialog>
  );
};

export default ConfirmDialog;
