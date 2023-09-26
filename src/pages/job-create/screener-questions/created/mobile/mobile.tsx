import store from 'src/store/store';
import { Accordion } from 'src/components/atoms/accordion/accordion';
import { Button } from 'src/components/atoms/button/button';
import { resetCreatedQuestion } from 'src/store/reducers/createQuestionWizard.reducer';
import { resetCreatePostWizard } from 'src/store/reducers/createPostWizard.reducer';
import { dialog } from 'src/core/dialog/dialog';
import { useCreatedShared } from '../created.shared';
import css from './mobile.module.scss';

export const Mobile: React.FC = () => {
  const navigate = {};
  const resolver = useMatch();
  const { questions, onRemoveCreatedQuestion } = useCreatedShared();

  function submit() {
    dialog.alert({ title: 'Successfully', message: 'You have successfully created a job post' }).then(() => {
      navigate({ to: `/m/jobs/created/${resolver.params.id}` });
      store.dispatch(resetCreatedQuestion());
      store.dispatch(resetCreatePostWizard());
    });
  }

  return (
    <div className={css.container}>
      <div className={css.header}>
        <div className={css.chevron} onClick={() => navigate({ to: `/jobs/create/screener-questions` })}>
          <img height={24} src="/icons/chevron-left.svg" />
        </div>
        <div className={css.headerTitle}>Create job</div>
      </div>
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
              <span className={css.question__header}>{question.type === 'MULTIPLE' ? 'Multiple choices' : 'Text'}</span>
              {question.question}
            </div>
            <div className={css.edit}>
              <img src="/icons/trash-bin.svg" onClick={() => onRemoveCreatedQuestion(question)} />
            </div>
          </Accordion>
        ))}
        <div
          className={css.addQuestions}
          onClick={() => {
            navigate({ to: `/jobs/create/screener-questions` });
          }}
        >
          <img src="/icons/add-circle.svg" />
          Add question
        </div>
      </div>
      <div className={css.btnContainer}>
        <Button color="white" onClick={submit}>
          Continue
        </Button>
      </div>
    </div>
  );
};
