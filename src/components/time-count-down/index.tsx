import { useEffect, useState } from 'react';

import { Typography } from '@mui/material';

import { getCounterTime } from '@/utils/timer';

interface Props {
  timer: number;
  doneHandler?: any;
  color?: string;
}

const CountDown = (props: Props) => {
  const { timer = 0, doneHandler } = props;

  const [time, setTime] = useState(timer);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (time > 0) {
        setTime(time - 1);
      } else {
        if (doneHandler) {
          doneHandler();
        }
      }
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [doneHandler, time]);

  return (
    <div className={'flex flex-row items-center justify-center w-[80px]'}>
      <Typography component={'span'} variant={'body1'}>
        {getCounterTime(time)}
      </Typography>
      <i className="ri-time-line text-[24px] text-gray-600 mr-1" />
    </div>
  );
};

export default CountDown;
