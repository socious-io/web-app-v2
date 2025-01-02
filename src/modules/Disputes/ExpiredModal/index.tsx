import AlertMessage from 'src/modules/general/components/AlertMessage';
import { Button } from 'src/modules/general/components/Button';
import { FeaturedIcon } from 'src/modules/general/components/featuredIcon-new';
import { Modal } from 'src/modules/general/components/modal';

import { ExpiredModalProps } from './index.types';

const ExpiredModal: React.FC<ExpiredModalProps> = ({ open, handleClose, disputeInfo }) => {
  const { code } = disputeInfo || {};

  const headerJSX = (
    <div className="flex flex-col gap-4 text-md font-semibold text-Gray-light-mode-900">
      <FeaturedIcon iconName="message-alert-circle" type="modern" size="lg" theme="gray" />
      Invitation to be a juror on a dispute (Dispute ID #{code})
    </div>
  );

  const footerJSX = (
    <Button variant="text" color="secondary" customStyle="mb-5 hover:!bg-Base-White" onClick={handleClose}>
      Close
    </Button>
  );

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title={headerJSX}
      footer={footerJSX}
      footerDivider={false}
      mobileCentered
      customStyle="max-w-[480px]"
      contentClassName="py-5 px-4 md:px-6"
    >
      <AlertMessage
        theme="gray"
        iconName="alert-circle"
        title="Invitation expired"
        subtitle="We're sorry, but the deadline to accept the invitation to serve as a juror for this case has passed. As we didn't receive your response within the specified 72-hour timeframe, we have assumed that you are unable to participate at this time. Another juror will be selected to take your place."
        colOrderMobileView
      />
    </Modal>
  );
};

export default ExpiredModal;
