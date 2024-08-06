import Stack from '@mui/material/Stack';

import { Skeleton } from '@mui/material';
import Typography from '@mui/material/Typography';
import CustomAvatar from '@/layouts/materialize-layout/@core/components/mui/Avatar';
import { ICustomerGeneralInfo, IStore } from '@/types';

type Props = {
  store: IStore | undefined;
  userInfo: ICustomerGeneralInfo | undefined;
  isLoading: boolean;
};
const MobileAccountBrief = ({ userInfo, store, isLoading }: Props) => {
  return (
    <Stack className={'w-full flex flex-col items-center gap-2'}>
      <CustomAvatar src={''} alt={userInfo?.name} size={80} />
      <Stack className={'w-full flex flex-col text-center gap-1'}>
        {isLoading ? (
          <>
            <Skeleton className={'w-full bg-[var(--mui-palette-customColors-menuItemColor)]'} />
            <Skeleton className={'w-full bg-[var(--mui-palette-customColors-menuItemColor)]'} />
          </>
        ) : (
          <>
            <Typography
              component={'p'}
              className={
                'overflow-hidden whitespace-nowrap text-ellipsis font-semibold text-[var(--mui-palette-text-primary)]'
              }
            >
              {userInfo?.name || '-----'}
            </Typography>
            <Typography
              component={'p'}
              className="overflow-hidden whitespace-nowrap text-ellipsis  text-[0.75rem] text-[var(--mui-palette-text-secondary)]"
            >
              {store?.title || '-----'}
            </Typography>
          </>
        )}
      </Stack>
    </Stack>
  );
};

export default MobileAccountBrief;
