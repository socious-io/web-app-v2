import { useState } from 'react';
import { Accordion } from 'src/components/atoms/accordion/accordion';
import { AlertModal } from 'src/components/organisms/alert-modal';
import { WebModal } from 'src/components/templates/web-modal';
import { resetCreatePostWizard } from 'src/store/reducers/createPostWizard.reducer';
import { resetCreatedQuestion } from 'src/store/reducers/createQuestionWizard.reducer';
import store from 'src/store/store';

import css from './created-modal.module.scss';
import { CreatedModalProps } from './created-modal.types';
import { useCreatedShared } from '../created.shared';

export const CreatedModal: React.FC<CreatedModalProps> = ({ open, onClose, onBack, onDone }) => {
  const navigate = {};
  const { questions, onRemoveCreatedQuestion } = useCreatedShared();
  const [openAlertModal, setOpenAlertModal] = useState(false);

  function submit() {
    onClose();
    setOpenAlertModal(true);
  }

  function done() {
    store.dispatch(resetCreatedQuestion());
    store.dispatch(resetCreatePostWizard());
    setOpenAlertModal(false);
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
                <div className={css.edit}>
                  <img
                    className={css.edit__icon}
                    src="/icons/trash-bin.svg"
                    onClick={() => onRemoveCreatedQuestion(question)}
                  />
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
      <AlertModal
        open={openAlertModal}
        onClose={() => {
          setOpenAlertModal(false);
          done();
        }}
        title="Job created"
        subtitle="Your job is posted and now visible for users to apply."
        buttons={[{ children: 'Back to jobs', onClick: done }]}
        contentClassName={css.success}
      />
    </>
  );
};
