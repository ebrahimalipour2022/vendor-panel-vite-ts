import type { ComponentType } from 'react';

import Typography from '@mui/material/Typography';
import { EmptyStateIcon } from '@/assets/icons';

type Props = {
  element?: ComponentType<any>;
  elementProps?: any;
  title: string;
  subTitle: string;
};

const EmptyState = ({ title, subTitle, element: Element, elementProps }: Props) => {
  return (
    <div className={'w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'}>
      <div className={'flex flex-col items-center gap-2 p-2'}>
        <div className={'h-[181px] w-[270px] md:h-[288px] md:w-[400px] '}>
          <EmptyStateIcon />
        </div>
        {title && (
          <Typography component={'h2'} fontWeight={'bold'} fontSize={'1.125rem'}>
            {title}
          </Typography>
        )}
        {subTitle && (
          <Typography component={'p'} variant={'body2'}>
            {subTitle}
          </Typography>
        )}
        {Element && <Element {...elementProps} />}
      </div>
    </div>
  );
};

export default EmptyState;
