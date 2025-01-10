import React from 'react';
import { translate } from 'src/core/utils';
import { AlertModal } from 'src/modules/general/components/AlertModal';
import { Button } from 'src/modules/general/components/Button';
import { CardRadioButton } from 'src/modules/general/components/cardRadioButton/cardRadioButton';
import { Input } from 'src/modules/general/components/input/input';
import { Modal } from 'src/modules/general/components/modal';

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
          title={translate('cont-give-review')}
          handleClose={closeReviewModal}
          mobileFullHeight={false}
          customStyle={css.modalWidth}
        >
          <div>
            {/* <form onSubmit={handleSubmit(onSubmit)}> */}
            <form>
              <div className="pt-6 px-6">
                <div className="mb-5">
                  <h2 className="text-Gray-light-mode-700 font-semibold text-sm">{translate('cont-review')}</h2>
                  <p className="text-sm font-normal text-Gray-light-mode-600 mb-1">
                    {translate('cont-give-review-subtitle', { name: name })}
                  </p>
                  <Input
                    required
                    multiline
                    customHeight="92px"
                    register={register}
                    id="content"
                    name="content"
                    placeholder={translate('cont-review-placeholder')}
                    errors={errors['content']?.message ? [errors['content']?.message.toString()] : undefined}
                  />
                </div>
                <div>
                  <h2 className="text-Gray-light-mode-700 font-semibold text-sm">
                    {translate('cont-review-satisfaction')}
                  </h2>
                  <p className="text-sm font-normal text-Gray-light-mode-600 mb-2">
                    {' '}
                    {translate('cont-review-rate-title')}
                  </p>
                  <CardRadioButton
                    items={cardOptionList}
                    selectedValue={selectedValue}
                    setSelectedValue={setSelectedValue}
                  />
                </div>
              </div>
              <div className={css.footer}>
                <Button variant="outlined" color="secondary" fullWidth onClick={closeReviewModal}>
                  {translate('cont-cancel')}
                </Button>
                <Button color="primary" fullWidth onClick={handleSubmit(onSubmit)}>
                  {translate('cont-review-submit')}
                </Button>
              </div>
            </form>
          </div>
          {/* <div onClick={handleCloseSuccessModal}></div> */}
        </Modal>
      )}
      <AlertModal
        open={openSuccessModal}
        onClose={handleCloseSuccessModal}
        onSubmit={handleCloseSuccessModal}
        message={translate('cont-review-submit-msg')}
        title={translate('cont-review-submit-msg-title')}
      />
    </>
  );
};
