import { Typography } from '@mui/material';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { Answer, Job } from 'src/core/api';
import { QuestionsRes } from 'src/core/types';
import { Input } from 'src/Nowruz/modules/general/components/input/input';
import { RadioGroup } from 'src/Nowruz/modules/general/components/RadioGroup';

interface ApplyModalQuestionsProps {
  answers: Answer[];
  setAnswers: (newVal: Answer[]) => void;
  questionErrors: { id: string; message: string }[];
}
const ApplyModalQuestions: React.FC<ApplyModalQuestionsProps> = ({ answers, setAnswers, questionErrors }) => {
  const { screeningQuestions } = useLoaderData() as {
    jobDetail: Job;
    screeningQuestions: QuestionsRes;
  };

  const handleSelectOption = (questionId: string, selectedOption: number, answer: string) => {
    const answersCopy = [...answers];
    const idx = answersCopy.findIndex((item) => item.id === questionId);
    if (idx > -1) {
      answersCopy[idx].selected_option = selectedOption;
      answersCopy[idx].answer = answer;
    } else answersCopy.push({ id: questionId, selected_option: selectedOption, answer });
    setAnswers(answersCopy);
  };

  const handleTypeAnswer = (questionId: string, value: string) => {
    const answersCopy = [...answers];
    const idx = answersCopy.findIndex((item) => item.id === questionId);
    if (idx > -1) answersCopy[idx].answer = value;
    else answersCopy.push({ id: questionId, answer: value });
    setAnswers(answersCopy);
  };
  return (
    <div className="flex flex-col gap-4">
      <Typography variant="h4" className="text-Gray-light-mode-700">
        Screening questions
      </Typography>
      {screeningQuestions.questions.map((question) => (
        <div key={question.id} className="flex flex-col gap-4">
          <Typography variant="h5" className="text-Gray-light-mode-600">
            {question.question}
          </Typography>

          {question.options ? (
            <RadioGroup
              row={false}
              id="answer-options"
              name="options"
              items={question.options.map((o, index) => {
                return { label: o, value: index + 1 };
              })}
              onChange={(type) => handleSelectOption(question.id, Number(type.value), type.label)}
              errors={
                questionErrors.find((e) => e.id === question.id)
                  ? [questionErrors.find((e) => e.id === question.id).message]
                  : undefined
              }
              defaultValue={answers.find((a) => a.id === question.id)?.selected_option}
            />
          ) : (
            <Input
              id={`${question.id}-answer`}
              value={answers.find((a) => a.id === question.id)?.answer}
              onChange={(e) => handleTypeAnswer(question.id, e.target.value)}
              errors={
                questionErrors.find((e) => e.id === question.id)
                  ? [questionErrors.find((e) => e.id === question.id).message]
                  : undefined
              }
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ApplyModalQuestions;
