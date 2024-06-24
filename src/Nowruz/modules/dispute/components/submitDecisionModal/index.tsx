import React from 'react';
import { Dispute, Identity } from 'src/core/api';
import { Avatar } from 'src/Nowruz/modules/general/components/avatar/avatar';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { FeaturedIcon } from 'src/Nowruz/modules/general/components/featuredIcon-new';
import { Modal } from 'src/Nowruz/modules/general/components/modal';

import { useSubmitDecisionModal } from './useSubmitDecisionModal';

interface SubmitDecisionProps {
  disputeId: string;
  open: boolean;
  handleClose: (submitted: boolean) => void;
  setDispute: (val: Dispute) => void;
  claimant: Identity;
  respondent: Identity;
}
export const SubmitDecision: React.FC<SubmitDecisionProps> = ({
  disputeId,
  open,
  handleClose,
  setDispute,
  claimant,
  respondent,
}) => {
  const { selected, setSelected, claimantImg, respondentImg, handleSubmit } = useSubmitDecisionModal(
    disputeId,
    claimant,
    respondent,
    setDispute,
    handleClose,
  );
  const footerJsx = (
    <div className=" w-full flex flex-col gap-3 p-4 md:p-6 mb-0 mt-auto">
      <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
        Submit Decision
      </Button>

      <Button variant="outlined" color="primary" fullWidth onClick={() => handleClose(false)}>
        Cancel
      </Button>
    </div>
  );
  return (
    <Modal
      open={open}
      handleClose={() => handleClose(false)}
      icon={<FeaturedIcon iconName="message-alert-circle" size="lg" theme="gray" type="modern" />}
      title="Submit your decision"
      subTitle="As a juror, please carefully review the evidence and arguments presented by both the claimant and the respondent. After considering the facts of the case, select the party you believe has the stronger position based on the information provided."
      footer={footerJsx}
      mobileFullHeight
      headerDivider
      footerDivider={false}
      customStyle="md:w-[480px]"
      inlineTitle={false}
    >
      <div className="py-5 px-4 md:px-6 flex flex-col gap-4 md:flex-row md:gap-6">
        {['CLAIMANT', 'RESPONDENT'].map(item => (
          <div
            key={item}
            className={`flex-1 flex rounded-xl border border-solid p-4 ${
              selected === item ? 'border-Brand-600' : 'border-Gray-light-mode-200'
            } cursor-pointer items-start`}
            onClick={() => {
              setSelected(item as 'CLAIMANT' | 'RESPONDENT');
            }}
          >
            <div className="flex-1 flex flex-col gap-3 justify-start">
              <Avatar
                type={item === 'CLAIMANT' ? claimant.type : respondent.type}
                size="40px"
                img={item === 'CLAIMANT' ? claimantImg : respondentImg}
              />
              <div className="flex flex-col">
                <span className="text-sm font-medium leading-5 text-Gray-light-mode-700">
                  {item === 'CLAIMANT' ? 'The claimant' : 'The respondent'}
                </span>
                <span className="text-sm font-medium leading-5 text-Gray-light-mode-600">
                  {item === 'CLAIMANT' ? claimant.meta.name : respondent.meta.name}
                </span>
              </div>
            </div>
            {item === selected ? (
              <div className="w-4 h-4 bg-Brand-600 flex items-center justify-center rounded-default ">
                <div className="w-1.5 h-1.5 bg-Base-White rounded-default" />
              </div>
            ) : (
              <div className="w-4 h-4 rounded-default border border-solid border-Gray-light-mode-200" />
            )}
          </div>
        ))}
      </div>
    </Modal>
  );
};
