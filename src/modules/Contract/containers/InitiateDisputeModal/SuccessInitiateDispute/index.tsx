import { Slide, SlideProps } from '@mui/material';
import { isTouchDevice } from 'src/core/device-type-detector';
import { translate } from 'src/core/utils';
import { FeaturedIconOutlined } from 'src/modules/general/components/featuredIconOutlined';
import CustomSnackbar from 'src/modules/general/components/Snackbar';

import { SuccessInitiateDisputeProps } from './index.types';

const SuccessInitiateDispute: React.FC<SuccessInitiateDisputeProps> = ({
  open,
  handleClose,
  disputeId,
  respondentName,
  respondDate,
}) => {
  const isMobile = isTouchDevice();
  const SlideTransition = (props: SlideProps) => <Slide {...props} direction={isMobile ? 'up' : 'left'} />;

  return (
    <CustomSnackbar
      open={open}
      onClose={handleClose}
      TransitionComponent={SlideTransition}
      containerClassName="flex-nowrap !items-start max-w-[400px]"
      contentClassName="md:!items-start"
      icon={<FeaturedIconOutlined iconName="check-circle" size="md" theme="success" />}
      anchorOrigin={isMobile ? { vertical: 'bottom', horizontal: 'center' } : { vertical: 'top', horizontal: 'right' }}
    >
      <div className="flex flex-col gap-4 pb-2 px-2 md:py-2 md:px-0">
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex flex-col text-sm font-semibold text-Gray-light-mode-900">
            {translate('cont-submitted-dispute-title')}
            <span className="font-normal text-sm leading-5 text-Gray-light-mode-500">
              {translate('cont-submitted-dispute-subtitle', { disputeId })}
            </span>
          </div>
        </div>
        <div className="text-sm flex flex-col gap-4 leading-5 text-Gray-light-mode-700">
          <p>
            <span className="font-semibold text-Brand-700">{respondentName} </span>
            {translate('cont-notify-dispute', { respondDate })}
          </p>
          <p>{translate('cont-track-dispute')}</p>
        </div>
      </div>
    </CustomSnackbar>
  );
};

export default SuccessInitiateDispute;
