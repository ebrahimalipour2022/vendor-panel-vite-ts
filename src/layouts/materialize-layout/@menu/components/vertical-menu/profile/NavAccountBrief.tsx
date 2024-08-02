import Stack from '@mui/material/Stack';

import { Skeleton } from '@mui/material';
import Typography from '@mui/material/Typography';

const NavAccountBrief = ({ userInfo, isLoading }: { userInfo: any; isLoading: boolean }) => {
  return (
    <Stack className={'w-full sm:flex-row items-center gap-2'}>
      <Stack className={'w-full flex-col justify-center gap-1'}>
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
                'overflow-hidden whitespace-nowrap text-ellipsis font-semibold text-[var(--mui-palette-common-white)]'
              }
            >
              {userInfo?.name || '-----'}
            </Typography>
            <Typography
              component={'p'}
              className="overflow-hidden whitespace-nowrap text-ellipsis  text-[0.75rem] text-[var(--mui-palette-customColors-menuItemColor)]"
            >
              فروشگاه اکالا میدان انقلاب تهران
            </Typography>
          </>
        )}
      </Stack>
    </Stack>
  );
};

export default NavAccountBrief;