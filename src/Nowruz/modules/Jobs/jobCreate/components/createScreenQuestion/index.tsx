import React from 'react';
import variables from 'src/components/_exports.module.scss';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { IconButton } from 'src/Nowruz/modules/general/components/iconButton';
import { Input } from 'src/Nowruz/modules/general/components/input/input';
import { RadioGroup } from 'src/Nowruz/modules/general/components/RadioGroup';

import { CreateScreenQuestionProps } from './createScreenQuestion.types';
import css from './createScreenQuestions.module.scss';
import { useCreateScreenQuestion } from './useCreateScreenQuestion';

export const CreateScreenQuestion: React.FC<CreateScreenQuestionProps> = ({
  addQuestion,
  editQuestion,
  cancel,
  editedQuestion,
}) => {
  const {
    questionTypes,
    errors,
    onSelectQuestionType,
    register,
    type,
    isRequired,
    options,
    onAddOption,
    requireOptions,
    onSelectRequired,
    onDeleteOption,
    newOption,
    setNewOption,
    handleSubmit,
    onSubmit,
    optionError,
    isValid,
  } = useCreateScreenQuestion(editedQuestion, addQuestion, editQuestion);
  const renderInfo = (title: string, description: string) => (
    <div className={css.info}>
      <div className={css.infoTitle}>{title}</div>
      <div className={css.infoDescription}>{description}</div>
    </div>
  );

  console.log('test log isvalid', isValid, optionError);
  return (
    <div className={css.container}>
      <div className={css.row}>
        {renderInfo('Question type', '')}
        <div className={css.componentsContainer}>
          <RadioGroup
            items={questionTypes}
            defaultValue={type}
            errors={errors['type']?.message ? [errors['type']?.message.toString()] : undefined}
            onChange={(option) => onSelectQuestionType(option.value.toString())}
          />
        </div>
      </div>
      <div className={css.row}>
        {renderInfo('Question', '')}
        <div className={css.componentsContainer}>
          <Input
            register={register}
            name="questionText"
            errors={errors['questionText']?.message ? [errors['questionText']?.message.toString()] : undefined}
          />
        </div>
      </div>
      {type === 'Multi-choice' && (
        <div className={css.row}>
          {renderInfo('Options', '')}
          <div className={`${css.componentsContainer} flex flex-col gap-1`}>
            <div className="flex gap-1 items-center mb-2">
              <Input value={newOption} onChange={(e) => setNewOption(e.target.value)} />

              <IconButton
                iconName="plus"
                iconSize={20}
                iconColor={variables.color_grey_600}
                handleClick={onAddOption}
                size="medium"
              />
            </div>
            {optionError && <div className={`${css.infoDescription} ${css.infoError}`}>{optionError}</div>}
            {options?.map((o, index) => (
              <div key={o} className="flex gap-1 items-center justify-between">
                <div className={css.infoDescription}>{o}</div>
                <IconButton
                  iconName="trash-01"
                  iconSize={20}
                  iconColor={variables.color_grey_600}
                  handleClick={() => onDeleteOption(index)}
                  size="medium"
                />
              </div>
            ))}
          </div>
        </div>
      )}
      <div className={css.row}>
        {renderInfo('Is required?', '')}
        <div className={css.componentsContainer}>
          <RadioGroup
            items={requireOptions}
            defaultValue={isRequired ? 'yes' : 'no'}
            errors={errors['isRequired']?.message ? [errors['isRequired']?.message.toString()] : undefined}
            onChange={(option) => onSelectRequired(option.value.toString())}
          />
        </div>
      </div>
      <div className={`${css.row} md:justify-start gap-2 md:flex-row-reverse`}>
        <Button variant="contained" color="primary" onClick={handleSubmit(onSubmit)} disabled={!isValid || optionError}>
          {editedQuestion ? 'Edit question' : 'Add question'}
        </Button>
        <Button variant="outlined" color="secondary" onClick={cancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
};
