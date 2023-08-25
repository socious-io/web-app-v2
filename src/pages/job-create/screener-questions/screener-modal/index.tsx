import { useState } from 'react';
import store from 'src/store/store';
import { WebModal } from '@templates/web-modal';
import { RadioGroup } from '@molecules/radio-group/radio-group';
import { Textarea } from '@atoms/textarea/textarea';
import { Toggle } from '@atoms/toggle';
import { Input } from '@atoms/input/input';
import { CreatedModal } from '../created/created-modal';
import { AlertModal } from '@organisms/alert-modal';
import {
  resetCreatedQuestion,
  resetQuestions,
  setAddQuestion,
  setChoices,
  setCreatedQuestions,
  setQuestionProjectIds,
  setQuestionType,
  setRequiredQuestion,
} from 'src/store/reducers/createQuestionWizard.reducer';
import { resetCreatePostWizard } from 'src/store/reducers/createPostWizard.reducer';
import { printWhen } from 'src/core/utils';
import { ButtonProps } from '@atoms/button/button.types';
import { ScreenerModalProps } from './screener-modal.types';
import { CreateQuestionPayload } from 'src/core/types';
import { QUESTION_TYPE, createQuestion } from '../screener-questions.service';
import { useScreenerQuestionsShared } from '../screener-questions.shared';
import css from './screener-modal.module.scss';

export const ScreenerModal: React.FC<ScreenerModalProps> = ({ open, onClose, onDone, onOpen }) => {
  const { navigate, dispatch, formState, form, question, onAddChoice, onRemoveChoice, onReset, isDisabledAddQuestion } =
    useScreenerQuestionsShared();
  const [openCreatedModal, setOpenCreatedModal] = useState(false);
  const [openAlertModal, setOpenAlertModal] = useState(false);

  function submitSkip() {
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

  function submitWithQuestions() {
    const payloadQuestion: CreateQuestionPayload =
      formState.question_type === 'MULTIPLE'
        ? {
            question: question.question,
            required: question.required,
            options: question.options as string[],
          }
        : {
            question: question.question,
            required: question.required,
          };
    dispatch(setCreatedQuestions([...formState.created_questions, question]));
    createQuestion(payloadQuestion, formState.question_project_id.project_id).then((resp) => {
      dispatch(setQuestionProjectIds({ ...formState.question_project_id, question_id: resp.id }));
      store.dispatch(resetQuestions());
      form.reset();
      onClose();
      setOpenCreatedModal(true);
    });
  }

  const addQuestionsJSX = (
    <div className={css.questions}>
      <RadioGroup
        name="question-type"
        value={formState.question_type}
        onChange={(value) => {
          dispatch(setQuestionType(value));
          onReset();
        }}
        list={QUESTION_TYPE}
        label="Question type"
      />
      <Textarea register={form} label="Question" placeholder="Question" name="question" value={formState.question} />
      <div className={css.questions__required}>
        Require this question to be answered
        <Toggle
          name="required"
          checked={formState.required_question}
          onChange={(value) => dispatch(setRequiredQuestion(value))}
        />
      </div>
    </div>
  );

  const multipleChoiceJSX = (
    <>
      <div className={css.addQuestions} onClick={onAddChoice}>
        <img src="/icons/add-circle.svg" />
        Add choice
      </div>
      {printWhen(<div className={css.error}>Minimum of 2 choices required.</div>, formState.add_choices === 1)}
      {printWhen(<div className={css.error}>Maximum of 5 choices required.</div>, formState.add_choices > 5)}
      {printWhen(
        <div className={css.choices}>
          {Object.keys(formState.choices).map((key, index) => (
            <div key={key} className={css.choice}>
              <Input
                placeholder={`Choice ${index + 1}`}
                register={form}
                name={key}
                onKeyUp={(e) => dispatch(setChoices({ ...formState.choices, [key]: e.currentTarget.value }))}
              />
              <img src="/icons/trash-bin.svg" className={css.icon} onClick={() => onRemoveChoice(key)} />
            </div>
          ))}
        </div>,
        formState.add_choices > 0
      )}
    </>
  );

  const buttons: ButtonProps[] = !formState.add_question
    ? [
        {
          children: 'Skip',
          color: 'white',
          onClick: submitSkip,
        },
      ]
    : [
        {
          children: 'Add',
          color: 'blue',
          disabled: isDisabledAddQuestion,
          onClick: submitWithQuestions,
        },
        {
          children: 'Cancel',
          color: 'white',
          onClick: submitSkip,
        },
      ];

  return (
    <>
      <WebModal header="Create job" open={open} onClose={onClose} buttons={buttons}>
        <>
          <div className={css.screener}>
            Screener questions
            <span className={css.screener__subtitle}>Add up to 5 screener questions.</span>
          </div>
          <div className={css.main}>
            {printWhen(
              <div className={css.addQuestions} onClick={() => dispatch(setAddQuestion(true))}>
                <img src="/icons/add-circle.svg" />
                Add question
              </div>,
              !formState.add_question
            )}
            {printWhen(addQuestionsJSX, formState.add_question)}
            {printWhen(multipleChoiceJSX, formState.question_type === 'MULTIPLE')}
          </div>
        </>
      </WebModal>
      <CreatedModal
        open={openCreatedModal}
        onClose={() => setOpenCreatedModal(false)}
        onBack={() => {
          setOpenCreatedModal(false);
          onOpen();
        }}
        onDone={onDone}
      />
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
