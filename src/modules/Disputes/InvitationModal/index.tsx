import { AlertMessage } from 'src/modules/general/components/alertMessage';
import { Button } from 'src/modules/general/components/Button';
import { FeaturedIcon } from 'src/modules/general/components/featuredIcon-new';
import { Modal } from 'src/modules/general/components/modal';

import { InvitationModalProps } from './index.types';

const InvitationModal: React.FC<InvitationModalProps> = ({ open, handleClose, disputeInfo, onAccept, onDecline }) => {
  const { code, title } = disputeInfo || {};

  const headerJSX = (
    <div className="flex flex-col gap-4 text-md font-semibold text-Gray-light-mode-900">
      <FeaturedIcon iconName="message-alert-circle" type="modern" size="lg" theme="gray" />
      Invitation to be a juror on a dispute (Dispute ID #{code})
    </div>
  );

  const footerJSX = (
    <div className="w-full flex flex-col-reverse items-center gap-3 p-4 md:flex-row justify-end p-6">
      <Button variant="outlined" color="info" customStyle="w-full md:w-fit" onClick={onDecline}>
        Decline
      </Button>
      <Button variant="contained" color="primary" customStyle="w-full md:w-fit" onClick={onAccept}>
        Accept
      </Button>
    </div>
  );

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title={headerJSX}
      footer={footerJSX}
      contentClassName="py-5 px-4 md:px-6 h-full flex flex-col gap-5"
    >
      <AlertMessage
        theme="warning"
        iconName="alert-circle"
        title="Please respond within 72 hours of receiving this invitation."
        subtitle="If we do not receive your response within this timeframe, we will assume that you are unable to participate and will select another juror."
        colOrderMobileView
      />
      <div className="leading-6 text-Gray-light-mode-600 flex flex-col gap-5">
        <p>
          You have been selected as a potential juror for a dispute resolution case on the Socious platform. We believe
          that your expertise and impartial perspective would be valuable in helping to resolve this dispute fairly.
        </p>
        <p>
          Dispute Details:
          <ul className="list-disc mt-4 mx-6">
            <li>Dispute ID #{code}</li>
            <li>Dispute Title: {title}</li>
          </ul>
        </p>
        <p>
          As a juror, you will be responsible for reviewing the evidence and arguments presented by both the claimant
          and the respondent. You will then collaborate with two other jurors to reach a fair and unbiased decision.
        </p>
        <p>
          Thank you for considering this opportunity to contribute to the fairness and integrity of the Socious
          community.
        </p>
      </div>
    </Modal>
  );
};

export default InvitationModal;
