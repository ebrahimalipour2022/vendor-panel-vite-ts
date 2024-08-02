import Typography from '@mui/material/Typography';

import IconButton from '@mui/material/IconButton';

import type { ButtonProps } from '@mui/material/Button';

import { numberWithCommas } from '@/utils/number';
import OpenDialogOnElementClick from '@/components/dialogs/OpenDialogOnElementClick';
import EditWalletBalance from '@/components/dialogs/wallet-dialogs/wallet-balance';
import { useTranslation } from 'react-i18next';
import { PlusIcon } from '@/assets/icons';

const WalletBalance = () => {
  // hooks
  const { t } = useTranslation();

  // Vars
  const addAmountButtonProps: ButtonProps = {
    // children: <i className={'ri-add-line'} />,
    children: <PlusIcon />,
    variant: 'contained',
    color: 'primary',
    size: 'small',
  };

  return (
    <div
      className={
        'flex flex-row items-center justify-between max-h-10 px-2 py-2 gap-1 rounded-lg bg-[var(--mui-palette-primary-lightestOpacity)]'
      }
    >
      <Typography color={'primary'} variant={'body2'}>
        <span className={'hidden md:block'}>{t('wallet.walletBalance')}</span>
        <span className={'block md:hidden'}>{t('wallet.yourCredit')}</span>
      </Typography>

      <div className={'flex flex-row items-end justify-center mr-2'}>
        <Typography color={'primary'} fontWeight={'bold'} variant={'body1'}>
          {numberWithCommas(28352000)}
        </Typography>
        <Typography color={'primary'} variant={'body2'} mx={2}>
          {t('common.toman')}
        </Typography>
        <OpenDialogOnElementClick
          element={IconButton}
          elementProps={addAmountButtonProps}
          dialog={EditWalletBalance}
        />
      </div>
    </div>
  );
};

export default WalletBalance;
