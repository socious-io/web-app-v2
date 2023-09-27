import { Accordion } from 'src/components/atoms/accordion/accordion';
import { Button } from 'src/components/atoms/button/button';
import {
  resetCreatedQuestion,
  setAddQuestion,
  setDefaultQuestion,
  setQuestionProjectIds,
} from 'src/store/reducers/createQuestionWizard.reducer';
import store from 'src/store/store';

import css from './mobile.module.scss';
import { useCreatedShared } from '../created.shared';

export const Mobile: React.FC = () => {
  const navigate = {};
  const resolver = useMatch();

  const defaultQuestions = useMatch().ownData.defaultQuestions?.questions;
  const { questions, onRemoveCreatedQuestion } = useCreatedShared(defaultQuestions);

  return (
    <div className={css.container}>
      <div className={css.header}>
        <div className={css.chevron} onClick={() => navigate({ to: `/jobs/create/screener-questions` })}>
          <img height={24} src="/icons/chevron-left.svg" />
        </div>
        <div className={css.headerTitle}>Edit job</div>
      </div>
      <div className={css.screener}>
        Screener questions
        <span className={css.screener__subtitle}>Add up to 5 screener questions.</span>
      </div>
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
              <span className={css.question__header}>{question.type === 'MULTIPLE' ? 'Multiple choices' : 'Text'}</span>
              {question.question}
            </div>
            <div className={css.edit}>
              <img
                alt="remove-question"
                className={css.edit__icon}
                src="/icons/pen.svg"
                onClick={() => {
                  store.dispatch(setDefaultQuestion(defaultQuestions[index]));
                  store.dispatch(
                    setQuestionProjectIds({
                      project_id: resolver.params.id,
                      question_id: defaultQuestions[index].id,
                    })
                  );
                  navigate({ to: `/jobs/edit/screener-questions` });
                }}
              />
              <img
                src="/icons/trash-bin.svg"
                alt="remove"
                onClick={() =>
                  onRemoveCreatedQuestion({ projectId: resolver.params.id, questionId: defaultQuestions[index].id })
                }
              />
            </div>
          </Accordion>
        ))}
        <div
          className={css.addQuestions}
          onClick={() => {
            store.dispatch(setAddQuestion(true));
            setQuestionProjectIds({
              project_id: resolver.params.id,
            });

            navigate({ to: `/jobs/edit/screener-questions` });
          }}
        >
          <img src="/icons/add-circle.svg" />
          Add question
        </div>
      </div>
      <div className={css.btnContainer}>
        <Button onClick={() => history.back()}>Done</Button>
      </div>
    </div>
  );
};
