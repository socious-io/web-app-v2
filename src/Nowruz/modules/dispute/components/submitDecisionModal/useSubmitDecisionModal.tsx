import { useState } from 'react';
import { Dispute, Identity, vote } from 'src/core/api';
import { getIdentityMeta } from 'src/core/utils';

export const useSubmitDecisionModal = (
  disputeId: string,
  claimant: Identity,
  respondent: Identity,
  setDispute: (value: Dispute) => void,
  handleClose: (submitted: boolean) => void,
) => {
  const [selected, setSelected] = useState<'CLAIMANT' | 'RESPONDENT'>('CLAIMANT');

  const { profileImage: claimantImg } = getIdentityMeta(claimant);
  const { profileImage: respondentImg } = getIdentityMeta(respondent);

  const handleSubmit = async () => {
    try {
      const res = await vote(disputeId, selected);
      setDispute(res);
      handleClose(true);
    } catch (error) {
      console.log('error in submitting decision', error);
    }
  };

  return { selected, setSelected, claimantImg, respondentImg, handleSubmit };
};
