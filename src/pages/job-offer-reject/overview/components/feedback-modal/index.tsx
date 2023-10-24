import { Button } from 'src/components/atoms/button/button';
import { Textarea } from 'src/components/atoms/textarea/textarea';
import { RadioGroup } from 'src/components/molecules/radio-group/radio-group';
import { Modal } from 'src/components/templates/modal/modal';

import css from './feedback-modal.module.scss';
import { FeedbackModalProps } from './feedback-modal.types';

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  open,
  onClose,
  buttons,
  talent_name,
  selectedRate,
  onChangeTextHandler,
  onRate,
}) => {
  const feedbackRateList = [
    { value: 'satisfactory', label: 'Satisfactory', icon: <img src="/icons/thumbs-up.svg" /> },
    { value: 'unsatisfactory', label: 'Unsatisfactory', icon: <img src="/icons/thumbs-down.svg" /> },
  ];

  return (
    <Modal open={open} onClose={onClose} className={css.container}>
      <>
        <div className={css.header}>
          <span />
          <span>Give feedback</span>
          <div onClick={onClose} className={css.icon}>
            <img src="/icons/close-black.svg" />
          </div>
        </div>
        <div className={css.main}>
          <span className={css.title}>Feedback</span>
          <span className={css.subtitle}>Share your experience working with {talent_name} for this job.</span>
          <Textarea placeholder="Your feedback" onChange={(e) => onChangeTextHandler(e.target.value)} />
          <div className={css.rate}>
            <span className={css.title}>Your satisfaction</span>
            <span className={css.subtitle}>How would rate the experience?</span>
            <RadioGroup
              name="rate"
              value={selectedRate}
              onChange={onRate}
              list={feedbackRateList}
              containerClassName={css.rate__radios}
              className={css.rate__radio}
            />
          </div>
        </div>
        <div className={css.footer}>{buttons?.map((button, index) => <Button key={index} {...button} />)}</div>
      </>
    </Modal>
  );
};
