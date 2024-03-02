import React from 'react';
import { AlertModal } from 'src/Nowruz/modules/general/components/AlertModal';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { CardRadioButton } from 'src/Nowruz/modules/general/components/cardRadioButton/cardRadioButton';
import { Input } from 'src/Nowruz/modules/general/components/input/input';
import { Modal } from 'src/Nowruz/modules/general/components/modal';

import css from './reviewModal.module.scss';
import { useReviewModal } from './useReviewModal';

interface ReviewModalProps {
  open: boolean;
  closeReviewModal: () => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({ open, closeReviewModal }) => {
  const {
    register,
    errors,
    onSubmit,
    handleSubmit,
    selectedValue,
    setSelectedValue,
    cardOptionList,
    name,
    openSuccessModal,
    handleCloseSuccessModal,
  } = useReviewModal(closeReviewModal);

  return (
    <>
      {!openSuccessModal && (
        <Modal
          open={open}
          title="Give Review"
          handleClose={closeReviewModal}
          mobileFullHeight={false}
          customStyle={css.modalWidth}
        >
          <div>
            {/* <form onSubmit={handleSubmit(onSubmit)}> */}
            <form>
              <div className="pt-6 px-6">
                <div className="mb-5">
                  <h2 className="text-Gray-light-mode-700 font-semibold text-sm">Review</h2>
                  <p className="text-sm font-normal text-Gray-light-mode-600 mb-1">
                    Share your experience working with {name} for this job.
                  </p>
                  <Input
                    required
                    multiline
                    customHeight="92px"
                    register={register}
                    id="content"
                    name="content"
                    placeholder="Enter your Review ..."
                    errors={errors['content']?.message ? [errors['content']?.message.toString()] : undefined}
                  />
                </div>
                <div>
                  <h2 className="text-Gray-light-mode-700 font-semibold text-sm">Your satisfaction</h2>
                  <p className="text-sm font-normal text-Gray-light-mode-600 mb-2"> How would rate the experience?</p>
                  <CardRadioButton
                    items={cardOptionList}
                    selectedValue={selectedValue}
                    setSelectedValue={setSelectedValue}
                  />
                </div>
              </div>
              <div className={css.footer}>
                <Button variant="outlined" color="secondary" fullWidth onClick={closeReviewModal}>
                  Cancel
                </Button>
                <Button color="primary" fullWidth onClick={handleSubmit(onSubmit)}>
                  Submit
                </Button>
              </div>
            </form>
          </div>
          {/* <div onClick={handleCloseSuccessModal}></div> */}
        </Modal>
      )}
      <AlertModal
        open={openSuccessModal}
        onClose={() => handleCloseSuccessModal}
        onSubmit={() => handleCloseSuccessModal}
        message="Your review has been successfully submitted"
        title="Review submitted"
      />
    </>
  );
};
