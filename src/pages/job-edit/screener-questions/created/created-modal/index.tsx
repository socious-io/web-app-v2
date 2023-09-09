import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-location';
import store from 'src/store/store';
import { WebModal } from 'src/components/templates/web-modal';
import { Accordion } from 'src/components/atoms/accordion/accordion';
import { AlertModal } from 'src/components/organisms/alert-modal';
import {
  resetCreatedQuestion,
  resetQuestions,
  setAddQuestion,
  setDefaultQuestion,
  setQuestionProjectIds,
} from 'src/store/reducers/createQuestionWizard.reducer';
import { CreatedModalProps } from './created-modal.types';
import { useCreatedShared } from '../created.shared';
import css from './created-modal.module.scss';
import { useDispatch } from 'react-redux';
import { ScreenerModal } from '../../screener-modal';

export const CreatedModal: React.FC<CreatedModalProps> = ({
  userQuestions,
  projectIds,
  open,
  onClose,
  onBack,
  onDone,
}) => {
  const dispatch = useDispatch();
  const { questions, onRemoveCreatedQuestion, setFormState } = useCreatedShared(userQuestions);
  const [openScreenerModal, setOpenScreenerModal] = useState(false);
  useEffect(() => {
    if (open) setFormState();
  }, [open]);
  return (
    <>
      <WebModal
        header="Edit questions"
        open={open}
        onClose={() => {
          dispatch(resetCreatedQuestion());
          onClose();
        }}
        buttons={[
          {
            children: 'Done',
            onClick: () => {
              dispatch(resetCreatedQuestion());
              onClose();
            },
          },
        ]}
      >
        <>
          <div className={css.main}>
            {questions.map((question, index) => (
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
                    alt="edit-question"
                    className={css.edit__icon}
                    src="/icons/pen.svg"
                    onClick={() => {
                      onClose();
                      setOpenScreenerModal(true);
                      dispatch(setDefaultQuestion(userQuestions[index]));
                      dispatch(
                        setQuestionProjectIds({
                          project_id: projectIds.projectId,
                          question_id: userQuestions[index].id,
                        })
                      );
                    }}
                  />
                  <img
                    alt="remove-question"
                    className={css.edit__icon}
                    src="/icons/trash-bin.svg"
                    onClick={() => {
                      dispatch(setDefaultQuestion(userQuestions[index]));

                      onRemoveCreatedQuestion({
                        questionId: userQuestions[index].id,
                        projectId: projectIds.projectId,
                      }).then(() => onDone());
                    }}
                  />
                </div>
              </Accordion>
            ))}
            <div
              className={css.addQuestions}
              onClick={() => {
                dispatch(resetQuestions());
                dispatch(
                  setQuestionProjectIds({
                    project_id: projectIds.projectId,
                    identity_id: projectIds.identityId,
                  })
                );
                dispatch(setAddQuestion(true));
                onClose();
                setOpenScreenerModal(true);
              }}
            >
              <img src="/icons/add-circle.svg" />
              Add question
            </div>
          </div>
        </>
      </WebModal>
      <ScreenerModal
        open={openScreenerModal}
        onClose={() => {
          setOpenScreenerModal(false);
          dispatch(setAddQuestion(false));
          onBack();
        }}
        onDone={() => {
          dispatch(resetCreatedQuestion());
          onDone();
          setOpenScreenerModal(false);
        }}
      />
    </>
  );
};
