import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { QuestionReq } from 'src/core/api';
import * as yup from 'yup';

const schema = yup
  .object()
  .shape({
    type: yup.string().required('Required'),
    questionText: yup.string().required('Required'),
    isRequired: yup.boolean(),
  })
  .required();

export const useCreateScreenQuestion = (addQuestion: (q: QuestionReq) => void) => {
  const [options, setOptions] = useState<string[]>([]);
  const [optionError, setOptionError] = useState('');
  const [newOption, setNewOption] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const questionTypes = [
    { label: 'Text', value: 'Text' },
    { label: 'Multi-choice', value: 'Multi-choice' },
  ];
  const requireOptions = [
    { label: 'yes', value: 'yes' },
    { label: 'no', value: 'no' },
  ];

  const onSelectQuestionType = (value: string) => {
    setValue('type', value, { shouldValidate: true });
  };

  const onAddOption = () => {
    if (!newOption) {
      setOptionError('Required');
      return;
    }
    const optionList = [...options].concat(newOption);
    setOptionError(optionList.length < 2 ? 'Please add at least two options' : '');
    setOptions(optionList);
  };

  const onDeleteOption = (index: number) => {
    const optValue = [...options];
    optValue.splice(index, 1);
    setOptionError(optValue.length < 2 ? 'Please add at least two options' : '');
    setOptions(optValue);
  };
  const onSelectRequired = (value: string) => {
    setValue('isRequired', value === 'yes', { shouldValidate: true });
  };

  const handleAddQuestion = () => {
    const { questionText, isRequired, type } = getValues();
    if (type === 'Multi-choice' && options.length < 2) {
      setOptionError('Please add at least two options');
      return;
    }
    setOptionError('');
    const q = { question: questionText, required: isRequired, options: options };
    addQuestion(q);
  };
  return {
    register,
    questionTypes,
    errors,
    onSelectQuestionType,
    options,
    setOptions,
    type: getValues().type,
    onAddOption,
    onDeleteOption,
    requireOptions,
    onSelectRequired,
    newOption,
    setNewOption,
    handleSubmit,
    handleAddQuestion,
    optionError,
  };
};
