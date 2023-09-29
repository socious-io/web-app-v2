import { useState } from 'react';
import { useNavigate } from '@tanstack/react-location';
import store from 'src/store/store';
import { WebModal } from 'src/components/templates/web-modal';
import { Accordion } from 'src/components/atoms/accordion/accordion';
import { resetCreatedQuestion } from 'src/store/reducers/createQuestionWizard.reducer';
import { resetCreatePostWizard } from 'src/store/reducers/createPostWizard.reducer';
import { CreatedModalProps } from './created-modal.types';
import { useCreatedShared } from '../created.shared';
import css from './created-modal.module.scss';
import { ReviewModal } from 'src/pages/job-create/final-review/review-modal';

export const CreatedModal: React.FC<CreatedModalProps> = ({ open, onClose, onEdit, onBack, onDone }) => {
  const navigate = useNavigate();
  const { questions, onRemoveCreatedQuestion } = useCreatedShared();
  const [openReviewModal, setOpenReviewModal] = useState(false);

  function submit() {
    onClose();
    setOpenReviewModal(true);
  }

  function done() {
    store.dispatch(resetCreatedQuestion());
    store.dispatch(resetCreatePostWizard());
    onDone();
    navigate({ to: '/jobs' });
  }

  return (
    <>
      <WebModal
        header="Create job"
        open={open}
        onClose={onClose}
        onBack={onBack}
        buttons={[{ children: 'Continue', color: 'white', onClick: submit }]}
      >
        <>
          <div className={css.screener}>
            Screener questions
            <span className={css.screener__subtitle}>Add up to 5 screener questions.</span>
          </div>
          <div className={css.main}>
            {questions.map((question) => (
              <Accordion
                key={question.id}
                title={question.id}
                id={question.id}
                inputClassName={css.accordion}
                contentClassName={css.accordion}
              >
                <div className={css.question}>
                  <span className={css.question__header}>
                    {question.type === 'MULTIPLE' ? 'Multiple choices' : 'Text'}
                  </span>
                  {question.question}
                </div>
                <div className={css.operation}>
                  <div className={css.edit}>
                    <img
                      className={css.edit__icon}
                      src="/icons/trash-bin.svg"
                      onClick={() => onRemoveCreatedQuestion(question)}
                    />
                  </div>
                  <div className={css.edit}>
                    <img className={css.edit__icon} src="/icons/pen.svg" onClick={() => onEdit(question)} />
                  </div>
                </div>
              </Accordion>
            ))}
            <div className={css.addQuestions} onClick={onBack}>
              <img src="/icons/add-circle.svg" />
              Add question
            </div>
          </div>
        </>
      </WebModal>
      <ReviewModal
        open={openReviewModal}
        onClose={() => {
          setOpenReviewModal(false);
          // done();
        }}
        onBack={() => {
          setOpenReviewModal(false);
          // onOpen();
        }}
        onOpen={() => {
          console.log('open modal');
        }}
        onDone={onDone}
      />
    </>
  );
};
