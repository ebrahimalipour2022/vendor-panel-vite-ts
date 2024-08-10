import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import CustomizedSteppers from '@/components/order-steps-progress';
import { progressStep } from '@/components/order-steps-progress/steps';
// sections
// ----------------------------------------------------------------------

export default function Page() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title> {t('pagesTitle.orders')}</title>
      </Helmet>
      <div className={'w-full mb-5'}>
        <CustomizedSteppers steps={progressStep.successfully} />
      </div>
      <div className={'w-full mb-5'}>
        <CustomizedSteppers steps={progressStep.returned} />
      </div>
      <div className={'w-full mb-5'}>
        <CustomizedSteppers steps={progressStep.canceled} />
      </div>
      <div className={'w-full'}>
        <CustomizedSteppers steps={progressStep.backAndForth} />
      </div>
    </>
  );
}
