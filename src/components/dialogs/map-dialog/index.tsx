import CustomDialog from '@/components/dialogs/custom-dialog';
import { useTranslation } from 'react-i18next';
import LeafletMapComponent from '@/components/LeafletMap';
import Button from '@mui/material/Button';
import type { ILocation, MapReverseAddressRes } from '@/types';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { OutlinedInput } from '@mui/material';

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  position?: ILocation | null;
  setAddress?: (address: MapReverseAddressRes) => void;
  onlyView?: boolean;
  title?: string;
  icon?: ReactNode;
};

const MapDialog = ({ open, setOpen, position, setAddress, onlyView, title, icon: Icon }: Props) => {
  const { t } = useTranslation();
  const [state, setState] = useState<MapReverseAddressRes>();
  const handleClick = () => {
    if (state && setAddress) {
      setAddress(state);
      setOpen(false);
    }
  };
  return (
    <CustomDialog
      open={open}
      setOpen={setOpen}
      title={title || ''}
      maxWidth={'lg'}
      fullWidth={true}
      icon={Icon}
      scroll={false}
    >
      <div className={'relative h-[90vh] md:h-[75vh] rounded-[1rem]]'}>
        <div className={'absolute left-0 top-0 rounded-[0.5rem] w-full h-[calc(100%_-_180px)]'}>
          <LeafletMapComponent position={position} setAddress={setState} onlyView={onlyView} />
        </div>
        <div
          className={
            'fixed md:absolute bottom-4 left-4 right-4 mx-auto bg-white flex flex-col gap-4 px-0 py-4'
          }
        >
          <OutlinedInput fullWidth placeholder={'آدرس شما ...'} value={state?.formatted_address} />
          <Button variant={'contained'} size={'large'} onClick={handleClick} fullWidth>
            {t('common.confirm')}
          </Button>
        </div>
      </div>
    </CustomDialog>
  );
};

export default MapDialog;
