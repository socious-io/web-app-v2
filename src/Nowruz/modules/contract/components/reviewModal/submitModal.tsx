import { AlertModal } from 'src/Nowruz/modules/general/components/AlertModal';

import { useReviewModal } from './useReviewModal';

export const SubmitModal = (handleClose) => {
    const { openSuccessModal,handleCloseSuccessModal } = useReviewModal(handleClose);
    return(
        <AlertModal
            open={true}
            onClose={()=> handleClose(false)}
            onSubmit={()=> handleClose(false)}
            message="Your review has been successfully submitted"
            title="Review submitted"
        />

    )

}

