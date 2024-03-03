import React from 'react';
import variables from 'src/components/_exports.module.scss';
import { IconButton } from 'src/Nowruz/modules/general/components/iconButton';

import css from './screenQuestions.module.scss';
import { ScreenQuestionProps } from './screenQuestions.type';

export const ScreenQuestion: React.FC<ScreenQuestionProps> = ({ question, index, handleDelete, handleEdit }) => {
  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex items-center">
        <div className={css.title}>{`${index + 1}.${question.question}`}</div>
        <div className={css.subtitle}>{` , ${question.options?.length ? 'Multiple choices' : 'Text'}, ${
          question.required ? 'Required' : 'Not required'
        }`}</div>
      </div>
      <div className="flex gap-1">
        <IconButton
          iconName="pencil-01"
          iconSize={20}
          iconColor={variables.color_grey_600}
          handleClick={() => handleEdit(index)}
          size="medium"
        />
        <IconButton
          iconName="trash-01"
          iconSize={20}
          iconColor={variables.color_grey_600}
          handleClick={() => handleDelete(index)}
          size="medium"
        />
      </div>

      {/* <div className="flex flex-col gap-4">
        {question.options?.map((o) => (
          <span key={o} className={css.title}>
            {o}
          </span>
        ))}
      </div> */}
    </div>
  );
};
