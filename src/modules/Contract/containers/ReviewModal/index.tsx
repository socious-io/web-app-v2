import { translate } from 'src/core/utils';
import { AlertModal } from 'src/modules/general/components/AlertModal';
import { Button } from 'src/modules/general/components/Button';
import CardRadioButton from 'src/modules/general/components/CardRadioButton';
import { Input } from 'src/modules/general/components/input/input';
import { Modal } from 'src/modules/general/components/modal';

import styles from './index.module.scss';
import { ReviewModalProps } from './index.types';
import { useReviewModal } from './useReviewModal';

const ReviewModal: React.FC<ReviewModalProps> = ({ open, closeReviewModal, contract }) => {
  const {
    data: { selectedReviewValue, register, errors, partnerName, openSuccessModal },
    operations: { setSelectedReviewValue, handleSubmit, onSubmit, setOpenSuccessModal },
  } = useReviewModal(closeReviewModal, contract);

  const cardOptionList = [
    { value: 'satisfactory', title: translate('cont-review-satisfactory'), img: <img src="/icons/thumbs-up.svg" /> },
    {
      value: 'unsatisfactory',
      title: translate('cont-review-unsatisfactory'),
      img: <img src="/icons/thumbs-down.svg" />,
    },
  ];

  const footerJsx = (
    <div className={styles['modal__footer']}>
      <Button color="secondary" variant="outlined" fullWidth onClick={closeReviewModal}>
        {translate('cont-cancel')}
      </Button>
      <Button type="submit" color="primary" variant="contained" fullWidth>
        {translate('cont-review-submit')}
      </Button>
    </div>
  );

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal
          open={open}
          handleClose={closeReviewModal}
          title={translate('cont-give-review')}
          footer={footerJsx}
          mobileFullHeight={false}
          mobileCentered
          customStyle="md:max-w-[480px]"
          contentClassName={styles['modal__content']}
        >
          <>
            <div className={styles['section']}>
              {translate('cont-review')}
              <span className={styles['section__subtitle']}>
                {translate('cont-give-review-subtitle', { name: partnerName })}
              </span>
              <Input
                register={register}
                name="content"
                id="content"
                placeholder={translate('cont-review-placeholder')}
                required
                multiline
                customHeight="92px"
                containerClassName="mt-2"
                errors={errors['content']?.message ? [errors['content']?.message.toString()] : undefined}
              />
            </div>
            <div className={styles['section']}>
              {translate('cont-review-satisfaction')}
              <span className={styles['section__subtitle']}>{translate('cont-review-rate-title')}</span>
              <CardRadioButton
                items={cardOptionList}
                selectedValue={selectedReviewValue}
                setSelectedValue={setSelectedReviewValue}
                containerClassName="mt-2"
              />
            </div>
          </>
        </Modal>
      </form>
      <AlertModal
        open={openSuccessModal}
        onClose={() => setOpenSuccessModal(false)}
        onSubmit={() => setOpenSuccessModal(false)}
        message={translate('cont-review-submit-msg')}
        title={translate('cont-review-submit-msg-title')}
      />
    </>
  );
};

export default ReviewModal;
