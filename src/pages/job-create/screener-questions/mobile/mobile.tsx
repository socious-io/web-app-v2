import store from 'src/store/store';
import { Button } from 'src/components/atoms/button/button';
import { RadioGroup } from 'src/components/molecules/radio-group/radio-group';
import { Textarea } from 'src/components/atoms/textarea/textarea';
import { Toggle } from 'src/components/atoms/toggle';
import { Input } from 'src/components/atoms/input/input';
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
import { dialog } from 'src/core/dialog/dialog';
import { printWhen } from 'src/core/utils';
import { CreateQuestionPayload } from 'src/core/types';
import { QUESTION_TYPE, createQuestion } from '../screener-questions.service';
import { useScreenerQuestionsShared } from '../screener-questions.shared';
import css from './mobile.module.scss';

export const Mobile: React.FC = () => {
  const { navigate, dispatch, formState, form, question, onAddChoice, onRemoveChoice, onReset, isDisabledAddQuestion } =
    useScreenerQuestionsShared();

  function submitSkip() {
    navigate({ to: '../final-review' });
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
      navigate({ to: '../final-review' });
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
              <img src="/icons/trash-bin.svg" onClick={() => onRemoveChoice(key)} />
            </div>
          ))}
        </div>,
        formState.add_choices > 0
      )}
    </>
  );

  return (
    <div className={css.container}>
      <div className={css.header}>
        <div className={css.headerTitle}>Create job</div>
      </div>
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
      <div className={css.btnContainer}>
        {printWhen(
          <Button color="white" onClick={submitSkip}>
            Skip
          </Button>,
          !formState.add_question
        )}
        {printWhen(
          <>
            <Button color="blue" disabled={isDisabledAddQuestion} onClick={submitWithQuestions}>
              Add
            </Button>
            <Button color="white" onClick={submitSkip}>
              Cancel
            </Button>
          </>,
          formState.add_question
        )}
      </div>
    </div>
  );
};
