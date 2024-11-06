import { translate } from 'src/core/utils';
import { AlertModal } from 'src/modules/general/components/AlertModal';

import { useReviewModal } from './useReviewModal';

export const SubmitModal = handleClose => {
  const { openSuccessModal, handleCloseSuccessModal } = useReviewModal(handleClose);
  return (
    <AlertModal
      open={true}
      onClose={() => handleClose(false)}
      onSubmit={() => handleClose(false)}
      message={translate('cont-review-submit-msg')}
      title={translate('cont-review-submit-msg-title')}
    />
  );
};
