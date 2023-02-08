import type { RadioGroupProps } from '../../molecules/radio-group/radio-group.types';
import { get } from '../../../core/http';
import { QuestionsRes } from '../../../core/types';
import { list } from '../intro/intro.constants';
import { Textarea } from '../../atoms/textarea/textarea';
import { RadioGroup } from '../../molecules/radio-group/radio-group';
import { Resume } from './job-apply.types';

export async function getScreeningQuestions(id: string): Promise<QuestionsRes> {
  return get(`projects/${id}/questions`).then(({ data }) => data);
}

const convertOptionsToRadioGroup = (options: QuestionsRes['options']): RadioGroupProps['list'] => {
  return (options as string[]).map((option) => {
    return { label: option, value: option };
  });
};

export function createTextQuestion(question: QuestionsRes, i: number): JSX.Element {
  return (
    <div>
      <Textarea
        placeholder="Your answer..."
        variant="outline"
        label={`${i}. ${question.question}`}
      />
    </div>
  );
}

export function createRadioQuestion(question: QuestionsRes, i: number): JSX.Element {
  return (
    <RadioGroup
      label={`${i}. ${question.question}`}
      list={convertOptionsToRadioGroup(question.options)}
      value=""
      name="radio"
      onChange={console.log}
    />
  );
}

export const resumeInitialState: Resume = {
  name: '',
  file: null,
};
