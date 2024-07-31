import Typography from '@mui/material/Typography'


import CustomDialog from '@/components/dialogs/custom-dialog'
import {useTranslation} from "react-i18next";

type AddOrderProps = {
  open: boolean
  setOpen: (open: boolean) => void
  // data?: AddEditAddressData
}

const NewOrder = ({ open, setOpen }: AddOrderProps) => {
  const { t } = useTranslation();

  return (
    <CustomDialog
      open={open}
      setOpen={setOpen}
      title={`${t('common.add')} ${t('orders.newOrder')}`}
      maxWidth={'md'}
      fullWidth={true}
      icon={<i className='ri-order-play-line text-primary ' />}
    >
      <Typography>coming soon... </Typography>
    </CustomDialog>
  )
}

export default NewOrder
